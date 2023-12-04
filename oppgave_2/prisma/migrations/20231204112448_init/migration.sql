-- CreateTable
CREATE TABLE `Athlete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'NON_BINARY', 'OTHER') NOT NULL,
    `sport` ENUM('RUN', 'BIKE', 'CROSS_COUNTRY_SKI', 'TRIATHLON', 'SWIMMING', 'STRENGTH', 'OTHER') NOT NULL,

    UNIQUE INDEX `Athlete_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
