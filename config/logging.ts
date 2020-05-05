import { Category, CategoryServiceFactory, CategoryConfiguration, LogLevel } from "typescript-logging";

const defaultLevel: LogLevel = LogLevel.Debug;
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(defaultLevel));

const rootLogger = new Category("root");
const categories: { [key: string]: Category } = {};

export const getLogger = (name: string): Category => {
  if (name in categories) return categories[name];

  const newCat = new Category(name, rootLogger);
  categories[name] = newCat;

  return newCat;
};
