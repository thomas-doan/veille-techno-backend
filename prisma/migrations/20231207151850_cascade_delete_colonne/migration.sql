-- DropForeignKey
ALTER TABLE `Cartes` DROP FOREIGN KEY `Cartes_colonneIdFk_fkey`;

-- AddForeignKey
ALTER TABLE `Cartes` ADD CONSTRAINT `Cartes_colonneIdFk_fkey` FOREIGN KEY (`colonneIdFk`) REFERENCES `Colonne`(`idColonne`) ON DELETE CASCADE ON UPDATE CASCADE;
