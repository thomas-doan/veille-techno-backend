-- CreateTable
CREATE TABLE `Role` (
    `idRole` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRole`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `hashedRt` VARCHAR(191) NULL,
    `roleIdFk` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cartes` (
    `idCarte` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `colonneIdFk` VARCHAR(191) NULL,

    PRIMARY KEY (`idCarte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colonne` (
    `idColonne` VARCHAR(191) NOT NULL,
    `userIdFk` VARCHAR(191) NULL,
    `titre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idColonne`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleIdFk_fkey` FOREIGN KEY (`roleIdFk`) REFERENCES `Role`(`idRole`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cartes` ADD CONSTRAINT `Cartes_colonneIdFk_fkey` FOREIGN KEY (`colonneIdFk`) REFERENCES `Colonne`(`idColonne`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colonne` ADD CONSTRAINT `Colonne_userIdFk_fkey` FOREIGN KEY (`userIdFk`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
