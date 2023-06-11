ALTER TABLE `collections` MODIFY COLUMN `name` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `collections` MODIFY COLUMN `slug` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `name` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `slug` varchar(256) NOT NULL;