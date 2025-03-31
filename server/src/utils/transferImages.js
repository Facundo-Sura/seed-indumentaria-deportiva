const { google } = require('googleapis');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Configuración
const KEYFILEPATH = './seed-indumentaria-deportiva-663ed5725895.json';
const DRIVE_FOLDER_ID = '1Q-zPlH0WSPT7xv5RAa4G5ynlq7an4WsJ';
const BUCKET_NAME = 'fotos-de-ropa';

// Inicializa clients
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = google.drive({ version: 'v3', auth });
const storage = new Storage({ keyFilename: KEYFILEPATH });

async function transferFiles() {
  try {
    // Lista archivos en Drive
    const res = await drive.files.list({
      q: `'${DRIVE_FOLDER_ID}' in parents`,
      fields: 'files(id, name, mimeType)',
    });

    const bucket = storage.bucket(BUCKET_NAME);

    // Procesa cada archivo
    for (const file of res.data.files) {
      if (file.mimeType.startsWith('image/')) {
        console.log(`Transferiendo ${file.name}...`);
        
        // Descarga el archivo de Drive
        const destPath = path.join('/tmp', file.name);
        const dest = fs.createWriteStream(destPath);
        
        const driveResponse = await drive.files.get(
          { fileId: file.id, alt: 'media' },
          { responseType: 'stream' }
        );
        
        driveResponse.data
          .on('end', () => console.log(`Descarga de ${file.name} completada`))
          .on('error', err => console.error(`Error al descargar ${file.name}:`, err))
          .pipe(dest);
        
        // Sube a Cloud Storage
        await bucket.upload(destPath, {
          destination: file.name,
          public: true, // Hace el archivo públicamente accesible
        });
        
        console.log(`${file.name} subido a Cloud Storage`);
      }
    }
  } catch (error) {
    console.error('Error en la transferencia:', error);
  }
}

transferFiles();