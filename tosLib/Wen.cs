using System;
using ExcelDna.Integration;
using Excel = Microsoft.Office.Interop.Excel;

namespace tosLib
{
    public static class Wen
    {
        public const int Row_BetaWeight = 1;
        public const string Col_Time = "A";
        public const string Col_Strategy = "B";
        public const string Col_PLOpen = "F";
        public const string Col_BuyingPowerReduction = "G";
        public const string Col_Closing = "H";
        public const string Col_Symbol = "J";
        public const string Col_Group = "K";
        public const string Col_Qty = "M";
        public const string Col_Strike = "O";
        public const string Col_StrategyType = "P";
        public const string Col_InitPremium = "Q";
        public const string Col_MarketPremium = "T";
        public const string Col_Delta = "V";
        public const string Col_Beta = "W";
        public const string Col_ManageWinner = "AD";

        [ExcelFunction(Description = "My first .NET function")]
        public static string SayHello(string name)
        {
            return "Hello " + name;
        }

        [ExcelFunction(Category = "wGetBetaWeightedDelta", Description = "Beta Weighted Delta")]
        public static double wGetBetaWeightedDelta()
        {
            Excel.Application app = (Excel.Application)ExcelDnaUtil.Application;
            Excel.Workbook wb = app.Workbooks[1];
            Excel.Worksheet ws = (Excel.Worksheet)app.ActiveWorkbook.ActiveSheet;
            //Excel.Worksheet ws = GetSheet("Main");

            // This gives us the row
            ExcelReference caller = (ExcelReference)XlCall.Excel(XlCall.xlfCaller);
            var currentRow = caller.RowFirst + 1;

            var spyClosingPrice = ws.Cells[Row_BetaWeight, Col_Letter_To_Number(Col_Closing)].Value;
            //var spyClosingPrice = new ExcelReference(Row_BetaWeight, (int)Col_Letter_To_Number(Col_Closing)).GetValue();
            var qty = ws.Cells[currentRow, Col_Letter_To_Number(Col_Qty)].Value;
            var Delta = 100 * ws.Cells[currentRow, Col_Letter_To_Number(Col_Delta)].Value;
            var beta = ws.Cells[currentRow, Col_Letter_To_Number(Col_Beta)].Value;
            var strikePrice = ws.Cells[currentRow, Col_Letter_To_Number(Col_Strike)].Value;

            //Excel.Name idxRange = wb.Names.Item("COL_Main_Index");
            //var row = (int)app.WorksheetFunction.Match(idx, idxRange.RefersToRange, 0);

            //// Get the Column
            //Excel.Name buyOrderRange = wb.Names.Item("COL_Main_BuyOrder");
            //var col = (int)buyOrderRange.RefersToRange.Cells.Column;

            //// create the range and update it
            //Excel.Range r = (Excel.Range)ws.Cells[row, col];
            return qty * strikePrice * beta * Delta * (1 / (double)spyClosingPrice);
        }

        private static double Col_Letter_To_Number(string columnLetter)
        {
            Excel.Application app = (Excel.Application)ExcelDnaUtil.Application;
            Excel.Workbook wb = app.Workbooks[1];
            Excel.Worksheet ws = (Excel.Worksheet)app.ActiveWorkbook.ActiveSheet;

            return ws.Range[columnLetter + "1", columnLetter + "1"].Column;
        }

        [ExcelFunction(Description = "My first2 .NET function")]
        public static int GetWL()
        {
            ExcelReference caller = (ExcelReference)XlCall.Excel(XlCall.xlfCaller);
            var currentRow = caller.RowFirst + 1;
            return currentRow;
            
            //return Excel.Application.WorksheetFunction.RTD("tos.rtd",null, "THETA", ".SPY200619C290");
            //XlCall.Excel.currentRow
            //var spyClosingPrice = ExcelDnaUtil.Application.caller..Cells(Row_BetaWeight, Col_Letter_To_Number(Col_Closing)).Value;
            //qty = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Qty)).Value
            //Delta = 100 * ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Delta)).Value
            //beta = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Beta)).Value
            //strikePrice = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Strike)).Value


            //ExcelReference nextRow = new ExcelReference(caller.RowFirst + 1, caller.RowFirst + 1, caller.ColumnFirst, caller.ColumnFirst, caller.SheetId);
            //return nextRow.GetValue();

            //var currentRow = ExcelDnaUtil.Application.Caller.Row
            //var app = (Excel.Application)ExcelDnaUtil.Application;
            //var rtd = app.GetType().InvokeMember("RTD", BindingFlags.GetProperty, null, app, null);
            //return rtd.GetType().InvokeMember("tos.rtd", BindingFlags.GetProperty, null, rtd, new object[] { "THETA", ".SPY200619C290" }).ToString();
            ////return obj.WorksheetFunction.RTD("tos.rtd",, "THETA", ".SPY200619C290");
        }

        [ExcelFunction(Description = "Get the value below the caller.", IsMacroType = true)]
        public static object GetNextRowValue()
        {
            ExcelReference caller = (ExcelReference)XlCall.Excel(XlCall.xlfCaller);
            ExcelReference nextRow = new ExcelReference(caller.RowFirst + 1, caller.RowFirst + 1, caller.ColumnFirst, caller.ColumnFirst, caller.SheetId);
            return nextRow.GetValue();
        }

    }

}
