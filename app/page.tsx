import Mainpage from "@/components/Mainpage/Mainpage";
import { PrismaClient } from "../node_modules/.prisma/client";

const getFakeData = async () => {
  // серверное действие - перед рендером страницы получаем фейковые данные с локальной бдшки

  const prisma = new PrismaClient();

  const req = await prisma.post.findMany();

  return req;
};

export default async function Home() {
  const fakeData = await getFakeData();

  return <Mainpage data={fakeData} />;
}
