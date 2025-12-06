import express from "express";
import cors from "cors";
import { S3Client , PutObjectCommand } from "@aws-sdk/client-s3" ;
import { getSignedUrl} from "@aws-sdk/s3-request-presigner";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("public"));


const s3 = new S3Client({region: process.env.AWS_REGION, credentials:{
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
} });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'public','upload.html'));
});


app.get("/presigned-url",async (req,res)=>{
    const filename = req.query.fileName;
    const filetype = req.query.fileType; 



const putCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    ContentType: filetype,
});

const url = await getSignedUrl(s3,putCommand,{expiresIn:300});
res.json({url});

});

app.listen(process.env.PORT,()=>{
    console.log(`Server running ${process.env.PORT} port.`);
});