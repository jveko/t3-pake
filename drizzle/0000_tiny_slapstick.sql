CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`owner_id` int NOT NULL,
	`product_id` int NOT NULL);

CREATE TABLE `collections` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` text,
	`parent_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`created_by` int NOT NULL,
	`updated_at` int NOT NULL);

CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`collection_id` int NOT NULL,
	`name` text,
	`stock` decimal DEFAULT '0',
	`price` decimal(10,2) DEFAULT '0',
	`description` text,
	`images` json);

CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`external_id` varchar(255) NOT NULL,
	`data` json,
	`is_deleted` boolean DEFAULT false,
	`role` text NOT NULL DEFAULT ('user'),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE UNIQUE INDEX `external_id_index` ON `users` (`external_id`);
ALTER TABLE `carts` ADD CONSTRAINT `carts_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `carts` ADD CONSTRAINT `carts_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `collections` ADD CONSTRAINT `collections_parent_id_collections_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `collections`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `collections` ADD CONSTRAINT `collections_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `collections` ADD CONSTRAINT `collections_updated_at_users_id_fk` FOREIGN KEY (`updated_at`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `products` ADD CONSTRAINT `products_collection_id_collections_id_fk` FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON DELETE no action ON UPDATE no action;