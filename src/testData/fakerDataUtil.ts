import { faker } from "@faker-js/faker";
import { create } from "domain";
import * as fs from 'fs';
import * as path from 'path';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

export interface FakerDataUtil {
    firstName: string;
    lastName: string;
    alias: string;
    email: string;
    userName: string;
    apodo: string;
}

const generateFakerData= (): FakerDataUtil =>{
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        alias: "test",
        email: faker.internet.email(),
        userName: faker.person.fullName(),
        apodo: "test1"
    };
};

export const generateTestData=(count: number): FakerDataUtil[]=>{
    const testData: FakerDataUtil[]= faker.helpers.multiple(generateFakerData, {count: count});
    return testData;
}

const currentDir= __dirname;
const srcDir= path.resolve(currentDir, '..');
const tesdataDir= path.resolve(srcDir, 'testData');

export const exportToJson= (data: FakerDataUtil[], filename: string)=>{
    fs.writeFileSync(path.resolve(tesdataDir, filename), JSON.stringify(data, null, 2));
    console.log(`Test data exported to ${filename}`);
}

export const exportToCsv= (data: FakerDataUtil[], filename: string)=>{
    const csvWriter = createCsvWriter({
        path: `${tesdataDir}\\${filename}`,
        header: [
            {id: 'firstName', title: 'First Name'},
            {id: 'lastName', title: 'Last Name'},
            {id: 'alias', title: 'Alias'},
            {id: 'email', title: 'Email'},
            {id: 'userName', title: 'User Name'},
            {id: 'apodo', title: 'Apodo'}
        ],
    });
    
    csvWriter.writeRecords(data).then(()=>{
        console.log(`Test data exported to ${tesdataDir}\\${filename}`);
    });    

    
}

 



