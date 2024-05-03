import Teacher from "./models/Teachers.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const names = [
  "Иван",
  "Анастасия",
  "Алексей",
  "Мария",
  "Петр",
  "Екатерина",
  "Дмитрий",
  "София",
  "Андрей",
  "Юлия",
  "Сергей",
  "Елена",
  "Михаил",
  "Татьяна",
  "Максим",
];
const surnames = [
  "Иванов",
  "Смирнов",
  "Кузнецов",
  "Попов",
  "Васильев",
  "Петров",
  "Соколов",
  "Михайлов",
  "Новиков",
  "Федоров",
  "Морозов",
  "Волков",
  "Алексеев",
  "Лебедев",
  "Семенов",
];
const specializations = [
  "Математика",
  "Физика",
  "Химия",
  "История",
  "Литература",
  "Иностранные языки",
  "Информатика",
  "Спорт",
  "Музыка",
  "Изобразительное искусство",
];
const emails = [
  "john.doe@edu.ru",
  "jane.doe@edu.ru",
  "johnson@edu.ru",
  "brown@edu.ru",
  "jones@edu.ru",
  "smith@edu.ru",
  "williams@edu.ru",
  "thomas@edu.ru",
  "jones@edu.ru",
  "miller@edu.ru",
  "davis@edu.ru",
  "thomas@edu.ru",
  "jones@edu.ru",
  "miller@edu.ru",
  "thomas@edu.ru",
  "jones@edu.ru",
  "miller@edu.ru",
  "thomas@edu.ru",
  "jones@edu.ru",
  "miller@edu.ru",
];
const phoneNumbers = [
  "+7 (901) 123-45-67",
  "+7 (902) 234-56-78",
  "+7 (903) 345-67-89",
  "+7 (904) 456-78-90",
  "+7 (905) 567-89-01",
  "+7 (906) 678-90-12",
  "+7 (907) 789-01-23",
  "+7 (908) 890-12-34",
  "+7 (909) 901-23-45",
  "+7 (910) 012-34-56",
  "+7 (911) 12-34-56",
  "+7 (912) 23-45-67",
  "+7 (913) 34-56-78",
  "+7 (914) 45-67-89",
  "+7 (915) 56-78-90",
];

function getRandomAge() {
  return Math.floor(Math.random() * 60) + 25;
}

function getRandomExperience() {
  return Math.floor(Math.random() * 30) + 1;
}
function getRandomDate() {
  const minDate = new Date(2000, 0, 1);
  const maxDate = new Date(2023, 11, 31);
  const randomDate = new Date(
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())
  );
  return `${randomDate.getFullYear()}-${String(
    randomDate.getMonth() + 1
  ).padStart(2, "0")}-${String(randomDate.getDate()).padStart(2, "0")}`;
}

function getRandomImagePath() {
  const fakerFolder = path.join(__dirname, "public", "img", "faker");
  const imageFiles = fs.readdirSync(fakerFolder);
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const relativePath = path.join("public", "img", "faker", randomImage);
  return relativePath.replace(/\\/g, "/");
}

for (let i = 0; i < 100; i++) {
  const teacherData = {
    Имя: names[Math.floor(Math.random() * names.length)],
    Фамилия: surnames[Math.floor(Math.random() * surnames.length)],
    Возраст: getRandomAge(),
    Специализация:
      specializations[Math.floor(Math.random() * specializations.length)],
    Стаж: getRandomExperience(),
    Email: emails[Math.floor(Math.random() * emails.length)],
    Телефон: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
    Зарплата: Math.floor(Math.random() * 100000) + 50000,
    Дата_принятия_на_работу: getRandomDate(),
    Фото: getRandomImagePath(),
  };
  Teacher.add(teacherData, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
