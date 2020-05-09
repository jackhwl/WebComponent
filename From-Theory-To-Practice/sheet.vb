Public Const TimeCol = "A"
Public Const StrategyCol = "B"
Public Const QtyCol = "D"
Public Const SymbolCol = "E"
Public Const GroupCol = "F"
Public Const StrikeCol = "H"
Public Const InitPremiumCol = "J"
Public Const PLOpenCol = "N"
Public Const ManageWinnerRate = 0.5
Public Const StopLoseRate = -3
Public Const ST_Strangle = "STRANGLE"
Public Const ST_Straddle = "STRADDLE"
Public Const ST_IC = "IC"



Private Function Col_Letter_To_Number(ColumnLetter As String) As Double
    Dim cNum As Double
        
    'Get Column Number from Alphabet
    cNum = Range(ColumnLetter & "1").Column
    
    'Return Column Number
    Col_Letter_To_Number = cNum
End Function
Function GetPLOpenPercentage()
    plOpen = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(PLOpenCol)).Value
    GetPLOpenPercentage = plOpen / (GetInitPremium() * 100)
End Function
Function GetGroup()
    '=IF(E2=E1,F1,F1+1)
    currentRow = Application.Caller.Row
    previousGroup = ActiveSheet.Cells(currentRow - 1, Col_Letter_To_Number(GroupCol)).Value
    previousSymbol = ActiveSheet.Cells(currentRow - 1, Col_Letter_To_Number(SymbolCol)).Value
    currentSymbol = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(SymbolCol)).Value
    previousTime = ActiveSheet.Cells(currentRow - 1, Col_Letter_To_Number(TimeCol)).Value
    currentTime = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(TimeCol)).Value
    If (currentTime <> "") Then
        If (previousTime <> "") Then
            If (currentSymbol = previousSymbol) Then
               currentGroup = IIf(currentTime <> previousTime, previousGroup + 1, previousGroup)
            Else
               currentGroup = previousGroup + 1
            End If
        Else
            currentGroup = previousGroup + 1
        End If
    Else
        currentGroup = previousGroup
    End If
    
    GetGroup = currentGroup
End Function
Function GetInitPremium()
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Value
        firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Value
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty)
    ElseIf GetStrategyName() = ST_IC Then
        firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Value
        firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Value
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        thirdPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(2, 0).Value
        thirdQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(2, 0).Value
        fourthPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(3, 0).Value
        fourthQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(3, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty + thirdPrice * thirdQty + fourthPrice * fourthQty)
    End If
    GetInitPremium = totalPremium
End Function
Function GetBreakEvenUp()
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Value
        firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Value
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty)
    ElseIf GetStrategyName() = ST_IC Then
    End If
End Function
Function GetManageWinnerAt()
    GetManageWinnerAt = GetInitPremium() * 100 * ManageWinnerRate
End Function
Function GetStopLoseAt()
    If GetStrategyName() = ST_IC Then
        firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrikeCol)).Value
        firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Value
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrikeCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        stopLose = -(firstStrikePrice * firstQty + secondStrikePrice * secondQty - GetInitPremium()) * 100
    Else
        stopLose = GetInitPremium() * 100 * StopLoseRate
    End If
    GetStopLoseAt = stopLose
End Function

Private Function GetStrategyName()
    GetStrategyName = UCase(ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrategyCol)).Value)
End Function

Private Function GetGroupFirstRow()
    currentRow = Application.Caller.Row
    If ActiveSheet.Cells(currentRow, Col_Letter_To_Number(GroupCol)).Value = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(GroupCol)).Offset(1, 0).Value Then
        If ActiveSheet.Cells(currentRow, Col_Letter_To_Number(GroupCol)).Value = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(GroupCol)).Offset(-1, 0).Value Then
            first_Row = currentRow - 1
        Else
            first_Row = currentRow
        End If
    ElseIf ActiveSheet.Cells(currentRow, Col_Letter_To_Number(GroupCol)).Value = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(GroupCol)).Offset(-1, 0).Value Then
        first_Row = currentRow - 1
    Else
        first_Row = currentRow
    End If
    GetGroupFirstRow = first_Row
End Function

