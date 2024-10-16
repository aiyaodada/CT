import { BadRequestException, Injectable } from "@nestjs/common";
import * as ExcelJS from "exceljs";
import { Response } from "express";
import { DateUtil } from "src/utils/dataUtils";
import { AllExceptions } from "../handler/all.exceptions";

@Injectable()
export class ExcelService {
  async exportExcel(res: Response, columns: any[] = [], data: any[], fileName: string = DateUtil.format(new Date(), "yyyyMMddhhmmss") + ".xlsx") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");
    // worksheet.columns = [
    //   { header: '编号', key: 'id', width: 10 },
    //   { header: '名称', key: 'name', width: 30 },
    //   { header: '性别', key: 'age', width: 10 },
    // ];
    worksheet.columns = columns;
    // worksheet.addRow({ id: 1, name: '张三', age: 18 });
    if (data.length > 0) {
      data.forEach((item, index) => {
        worksheet.addRow(item);
      });
    }
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    await workbook.xlsx.write(res);
    res.end();
  }

  async importExcel(buffer: Buffer, workSheet: number = 1): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.getWorksheet(workSheet); // 获取第一个工作表
      const data = [];
      worksheet.eachRow((row, rowNumber) => {
        const rowData = row.values;
        data.push(rowData);
      });
      return data;
    } catch (error) {
      throw new AllExceptions("读取Excel文件时出错");
    }
  }
}
