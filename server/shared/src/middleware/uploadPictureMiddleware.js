import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Spécifie le répertoire de destination des téléchargements
        cb(null, path.join(__dirname, "../../../uploads"));
    },
    filename: (req, file, cb) => {
        // Génère un nom de fichier unique en utilisant le timestamp actuel et le nom de fichier d'origine
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Multer configuration for handling picture uploads
const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter: (req, file, cb) => {
        // Vérifie l'extension du fichier pour les types d'images autorisés
        const allowedExtensions = [".png", ".jpg", ".jpeg"];
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (!allowedExtensions.includes(ext)) {
            // Fournit un message d'erreur clair pour les types de fichiers non valides
            return cb(new Error("Seules les images avec les extensions .png, .jpg ou .jpeg sont autorisées"));
        }

        cb(null, true);
    },
});
export { uploadPicture };
