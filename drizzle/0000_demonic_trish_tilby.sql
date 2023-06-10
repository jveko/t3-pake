CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`owner_id` int NOT NULL,
	`product_id` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`parent_id` int,
	`created_at` timestamp DEFAULT (now()),
	`created_by` int NOT NULL,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_by` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`collection_id` int NOT NULL,
	`name` text NOT NULL,
	`stock` decimal NOT NULL DEFAULT '0',
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`description` text NOT NULL,
	`images` json NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`created_by` int NOT NULL,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_by` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`external_id` varchar(255) NOT NULL,
	`data` json,
	`is_deleted` boolean DEFAULT false,
	`role` text NOT NULL DEFAULT ('user'),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
