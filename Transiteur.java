import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.io.*;
import java.util.zip.*;

public class Transiteur {

    public static void main(String[] args) throws IOException {
        // System.out.println(getProjectName());
        String zipFileName = "testgeneric.zip";
        String destDirName = ".";

        try {
            String currentDir = System.getProperty("user.dir");
            String zipFilePath = currentDir + File.separator + zipFileName;
            String destDirPath = currentDir + File.separator + destDirName;
            unzip(zipFilePath, destDirPath);
            System.out.println("Le fichier a été dézippé avec succès.");
            getContent();
            ArrayList<String> strs2 = getContent2();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static String getProjectName() {
        String cheminFichier = "recorder.project";
        String nomProjet = "";
        try (BufferedReader reader = new BufferedReader(new FileReader(cheminFichier))) {
            String ligne;
            while ((ligne = reader.readLine()) != null) {
                nomProjet = ligne;
            }
        } catch (IOException e) {
            System.err.println("Erreur lors de la lecture du fichier : " + e.getMessage());
        }
        return nomProjet;
    }

    public static ArrayList<String> getAllFiles() {
        String cheminRepertoire = getProjectName();
        ArrayList<String> allProjectFile = new ArrayList<>();
        File repertoire = new File(cheminRepertoire + "\\Views");
        if (repertoire.exists() && repertoire.isDirectory()) {
            File[] fichiers = repertoire.listFiles();
            if (fichiers != null) {
                for (File fichier : fichiers) {
                    if (fichier.isDirectory() && !fichier.getName().equals("Home")
                            && !fichier.getName().equals("Shared")) {
                        allProjectFile.add(fichier.getName());
                    }
                }
            }
        } else {
            System.out.println("Le répertoire spécifié n'existe pas ou n'est pas un répertoire.");
        }
        return allProjectFile;
    }

    public static ArrayList<String> getContent() throws IOException {
        String cheminRepertoire = getProjectName();
        ArrayList<String> allFiles = getAllFiles();
        ArrayList<String> allContent = new ArrayList<>();
        File directory = new File("testgeneric\\src\\pages");
        if (!directory.exists()) {
            directory.mkdirs(); // Crée les répertoires parents si nécessaire
        }
        for (String cheminFichier : allFiles) {
            allContent.add(new String(
                    Files.readAllBytes(Paths.get(cheminRepertoire + "\\Views\\" + cheminFichier + "\\Index.cshtml")),
                    StandardCharsets.UTF_8));
            File file = new File(directory, cheminFichier + ".tsx");
            if (file.createNewFile()) {
                Files.write(Paths.get("testgeneric\\src\\pages\\" + cheminFichier + ".tsx"),
                        new String(
                                Files.readAllBytes(
                                        Paths.get(cheminRepertoire + "\\Views\\" + cheminFichier + "\\Index.cshtml")),
                                StandardCharsets.UTF_8).getBytes(StandardCharsets.UTF_8));
                System.out.println("Le fichier a été créé avec succès.");
            } else {
                System.out.println("Le fichier existe déjà.");
            }
        }
        return allContent;
    }

    public static ArrayList<String> getContent2() throws IOException {
        String cheminRepertoire = getProjectName();
        ArrayList<String> allContent = new ArrayList<>();
        allContent.add(new String(Files.readAllBytes(Paths.get(cheminRepertoire + "\\Views\\Shared\\App.tsx")),StandardCharsets.UTF_8));
        File file = new File("testgeneric\\src", "App.tsx");
        if (file.createNewFile()) {
            Files.write(Paths.get("testgeneric\\src\\App.tsx"),new String(Files.readAllBytes(Paths.get(cheminRepertoire + "\\Views\\Shared\\App.tsx")),StandardCharsets.UTF_8).getBytes(StandardCharsets.UTF_8));
            System.out.println("Le fichier App a été créé avec succès.");
        } else {
            System.out.println("Le fichier existe déjà.");
        }

        allContent.add(new String(Files.readAllBytes(Paths.get(cheminRepertoire + "\\Views\\Shared\\Sidebar.tsx")),StandardCharsets.UTF_8));
        File file2 = new File("testgeneric\\src\\pages", "Sidebar.tsx");
        if (file2.createNewFile()) {
            Files.write(Paths.get("testgeneric\\src\\pages\\Sidebar.tsx"),new String(Files.readAllBytes(Paths.get(cheminRepertoire + "\\Views\\Shared\\Sidebar.tsx")),StandardCharsets.UTF_8).getBytes(StandardCharsets.UTF_8));
            System.out.println("Le fichier Sidebar a été créé avec succès.");
        } else {
            System.out.println("Le fichier existe déjà.");
        }
        return allContent;
    }

    public static void unzip(String zipFilePath, String destDir) throws IOException {
        File destDirectory = new File(destDir);
        if (!destDirectory.exists()) {
            destDirectory.mkdir();
        }

        try (ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath))) {
            ZipEntry entry = zipIn.getNextEntry();
            while (entry != null) {
                String filePath = destDir + File.separator + entry.getName();
                if (!entry.isDirectory()) {
                    extractFile(zipIn, filePath);
                } else {
                    File dir = new File(filePath);
                    dir.mkdir();
                }
                zipIn.closeEntry();
                entry = zipIn.getNextEntry();
            }
        }
    }

    private static void extractFile(ZipInputStream zipIn, String filePath) throws IOException {
        try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath))) {
            byte[] bytesIn = new byte[4096];
            int read;
            while ((read = zipIn.read(bytesIn)) != -1) {
                bos.write(bytesIn, 0, read);
            }
        }
    }
}
