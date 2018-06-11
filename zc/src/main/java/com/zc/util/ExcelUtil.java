package com.zc.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zc.controller.UploadController;

public class ExcelUtil {

	private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

	public static List<Map<String, String>> readExcelData(String realPath) {
		List<Map<String, String>> dataList = new ArrayList<>();
		String value = "";
		try {
			InputStream is = new FileInputStream(realPath);
			String extString = realPath.substring(realPath.lastIndexOf("."));
			Workbook workbook = getWorkbook(extString, is);
			Sheet sheet = workbook.getSheetAt(0);
			Row row = sheet.getRow(0);
			// 标题总列数
			int colNum = row.getPhysicalNumberOfCells();
			String[] keyArray = new String[colNum];
			for (int i = 0; i < colNum; i++) {
				keyArray[i] = (String) getCellFormatValue(row.getCell((short) i));
			}
			int rowNum = sheet.getLastRowNum();
			// 正文内容应该从第二行开始,第一行为表头的标题
			for (int i = 2; i <= rowNum; i++) {
				Map<String, String> dataMap = new HashMap<>();
				row = sheet.getRow(i);
				if (row != null) {
					int j = 0;
					while (j < colNum) {
						// 这里把列循环到Map
						if (row.getCell((short) j) != null) {
							value = (String) getCellFormatValue(row.getCell((short) j));
							dataMap.put(keyArray[j], value);
						}
						j++;
					}
					value = "";
					dataList.add(dataMap);
				}
			}
			logger.info("解析realPath={}完成.",realPath);
			try {
				if (is != null)
					is.close();
			} catch (IOException e) {
				e.printStackTrace();
				logger.error(e.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return dataList;
	}

	public static Object getCellFormatValue(Cell cell) {
		Object cellValue = null;
		if (cell != null) {
			// 判断cell类型
			switch (cell.getCellTypeEnum()) {
			case NUMERIC: {
//				cellValue = String.valueOf(cell.getNumericCellValue());
				cellValue = cell.toString();
				if (cell.toString().length() == 10 && cell.toString().indexOf("-") > -1) {
					Date date = cell.getDateCellValue();
					cellValue = DateUtil.getDateStr(date);
				}
				break;
			}
			case FORMULA: {
				// 判断cell是否为日期格式
//				if (DateUtil.isCellDateFormatted(cell)) {
////					 转换为日期格式YYYY-mm-dd
//					cellValue = cell.getDateCellValue();
//				} else {
//					// 数字
//					cellValue = String.valueOf(cell.getNumericCellValue());
//				}
				cellValue = cell.toString();
				break;
			}
			case STRING: {
				cellValue = cell.getRichStringCellValue().getString();
				break;
			}
			default:
				cellValue = "";
			}
		} else {
			cellValue = "";
		}
		return cellValue;
	}

	private static Workbook getWorkbook(String extString, InputStream is) throws IOException {
		Workbook workbook = null;
		if (".xls".equals(extString)) {
			return workbook = new HSSFWorkbook(is);
		} else if (".xlsx".equals(extString)) {
			return workbook = new XSSFWorkbook(is);
		} else {
			return workbook = null;
		}
	}

	public static void main(String[] args) {
		List<Map<String, String>> datalist = readExcelData(
				"F:\\new-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp2\\wtpwebapps\\zc\\upload\\2018持续更新数据库（6月8日）.xlsx");
//		System.out.println(datalist.size());
		 for (Map<String, String> map : datalist) {
			 System.out.println(map);
		 }
	}
}
