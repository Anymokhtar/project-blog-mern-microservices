import { verify } from "jsonwebtoken";
import axios from "axios";

const localhostUrl = 'http://localhost';

// Définir une constante pour le port
const port = 5000;

// Concaténer l'URL du serveur local avec le port
const apiUrl = `${localhostUrl}:${port}`;

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);

      // Utilisation d'Axios pour appeler votre API User
      const response = await axios.get(`${apiUrl}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      req.user = response.data; // Supposons que votre API renvoie les données utilisateur
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};
