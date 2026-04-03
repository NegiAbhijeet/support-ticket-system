import app from './app';
import connectDB from './config/db';


let dbConnected = false;
async function ensureDbConnected() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

// Universal handler for Vercel/serverless
const handler = async (req: any, res: any) => {
  await ensureDbConnected();
  return app(req, res);
};

export default handler;

// Local dev/server
if (!process.env.VERCEL && !process.env.NOW_REGION) {
  (async () => {
    await ensureDbConnected();
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })();
}
