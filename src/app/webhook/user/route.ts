import {Webhook, WebhookRequiredHeaders} from "svix";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {db} from "~/server/db";
import {users} from "~/server/db/schema";
import {eq} from "drizzle-orm";

const secret = process.env.CLERK_WEBHOOK_SECRET as string

export async function POST(request: Request) {
  const headersList = headers()
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await request.json();

  const wh = new Webhook(secret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(JSON.stringify(payload), heads as WebhookRequiredHeaders) as Event;
  } catch (e) {
    return NextResponse.json({}, {status: 401});
  }
  const eventType: EventType = evt.type;

  if (eventType == "user.created" || eventType == "user.updated") {
    evt.data = evt.data as UserCreatedEvent
    await db.insert(users)
      .values({
        external_id: evt.data.id,
        data: evt.data,
      }).onDuplicateKeyUpdate({
        set: {
          data: evt.data
        }
      })
  }
  if (eventType == "user.deleted") {
    evt.data = evt.data as UserDeletedEvent
    await db.update(users)
      .set({
        is_deleted: true
      }).where(eq(users.external_id, evt.data.id))
  }
  return NextResponse.json({"message": "Success"}, {status: 200})
}

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
  data: UserCreatedEvent | UserDeletedEvent,
  object: "event",
  type: EventType
}


export type UserCreatedEvent = {
  created_at: number;
  email_addresses: EmailAddress[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  private_metadata: any;
  profile_image_url: string;
  public_metadata: any;
  unsafe_metadata: any;
  updated_at: number;
  username: string | null;
};

type EmailAddress = {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  verification: {
    status: string;
    strategy: string;
  };
};

type UserDeletedEvent = {
  deleted: boolean;
  id: string;
  object: string;
};

export const runtime = "experimental-edge";
