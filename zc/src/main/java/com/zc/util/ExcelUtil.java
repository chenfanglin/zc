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

import com.monitorjbl.xlsx.StreamingReader;
import com.zc.constant.Constant;
import com.zc.model.PatentModel;

public class ExcelUtil {

	private static final Logger logger = LoggerFactory.getLogger(ExcelUtil.class);

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
				keyArray[i] = (String) getCellFormatValue(row.getCell(i));
			}
			int rowNum = sheet.getLastRowNum();
			// 正文内容应该从第二行开始,第一行为表头的标题
			for (int i = 1; i <= rowNum; i++) {
				Map<String, String> dataMap = new HashMap<>();
				row = sheet.getRow(i);
				if (row != null) {
					int j = 0;
					while (j < colNum) {
						// 这里把列循环到Map
						if (row.getCell((short) j) != null) {
							value = (String) getCellFormatValue(row.getCell(j));
							dataMap.put(keyArray[j], value);
						}
						j++;
					}
					value = "";
					dataList.add(dataMap);
				}
			}
			logger.info("解析realPath={}完成.", realPath);
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

	public static List<Map<String, String>> readExcelData2(String realPath) {
		List<Map<String, String>> dataList = new ArrayList<>();
		String value = "";
		try {
			InputStream is = new FileInputStream(realPath);
			Workbook workbook = StreamingReader.builder().rowCacheSize(1000) // number of rows to keep in memory
																			// (defaults to 10)
					.bufferSize(10240) // buffer size to use when reading InputStream to file (defaults to 1024)
					.open(is); // InputStream or File for XLSX file (required)
			Sheet sheet = workbook.getSheetAt(0);
			int first = 0;
			Row firstRow = null;
			String[] keyArray = null;
			for (Row row : sheet) {
				if (first == 0) {
					firstRow = row;
					// 标题总列数
					int colNum = firstRow.getPhysicalNumberOfCells();
					keyArray = new String[colNum];
					for (int i = 0; i < colNum; i++) {
						keyArray[i] = (String) getCellFormatValue(firstRow.getCell(i));
					}
				} else {
					Map<String, String> dataMap = new HashMap<>();
					if (row != null) {
						int j = 0;
						for (Cell cell : row) {
							if (cell != null) {
								value = (String) getCellFormatValue2(cell);
								dataMap.put(keyArray[j], value);
							}
							j++;
						}
						dataList.add(dataMap);
					}
				}

				first++;
			}
			logger.info("解析realPath={}完成.", realPath);
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
			switch (cell.getCellType()) {
			case NUMERIC: {
				cellValue = cell.toString();
				if (cell.toString().length() >= 10 && cell.toString().length() <= 16
						&& cell.toString().indexOf("-") > -1) {
					Date date = cell.getDateCellValue();
					cellValue = DateUtil.getDateStr(date);
				} else {
					if (cell.toString().contains("E") && cell.toString().indexOf(".") > -1) {
						String repStr = cell.toString().trim().replace(".", "").replaceAll(" ", "");
						cellValue = repStr.substring(0, repStr.length() - 3);
					}
				}
				break;
			}
			case FORMULA: {
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

	public static Object getCellFormatValue2(Cell cell) {
		Object cellValue = null;
		if (cell != null) {
			// 判断cell类型
			switch (cell.getCellType()) {
			case NUMERIC: {
				cellValue = cell.getStringCellValue();
				if (cell.toString().length() >= 10 && cell.toString().length() <= 16
						&& cell.toString().indexOf("-") > -1) {
					Date date = cell.getDateCellValue();
					cellValue = DateUtil.getDateStr(date);
				} else {
					if (cell.toString().contains("E") && cell.toString().indexOf(".") > -1) {
						String repStr = cell.toString().trim().replace(".", "").replaceAll(" ", "");
						cellValue = repStr.substring(0, repStr.length() - 3);
					}
				}
				break;
			}
			case FORMULA: {
				cellValue = cell.getStringCellValue();
				break;
			}
			case STRING: {
				cellValue = cell.getStringCellValue();
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
//		 List<Map<String, String>> datalist = readExcelData(
//		 "F:\\new-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp2\\wtpwebapps\\zc\\upload\\2018持续更新数据库（6月8日）.xlsx");
//		// System.out.println(datalist.size());
		List<Map<String, String>> datalist = ExcelUtil.readExcelData("/Users/jiatui/胡经理相关专利清单.xlsx");
		for (Map<String, String> map : datalist) {
			PatentModel patentModel = new PatentModel();

			String patentId = map.get(Constant.PATENT_ID);
			patentModel.setPatentId(patentId);
			System.out.println(map);
		}
//		int start = "1300(会员1100)".indexOf("(");
//		System.out.println("260000裸价".replaceAll("裸价", ""));
//		System.out.println("2.013100843347E11".contains("E"));
//		String repStr = "2.013100843347E11".replace(".", "");
//		System.out.println(repStr.substring(0, repStr.length() - 3).substring(0,4));
	}
}
