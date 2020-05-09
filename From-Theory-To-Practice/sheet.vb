Public Const TimeCol = "A"
Public Const StrategyCol = "B"
Public Const QtyCol = "D"
Public Const SymbolCol = "E"
Public Const GroupCol = "F"
Public Const StrikeCol = "H"
Public Const StrategyTypeCol = "I"
Public Const InitPremiumCol = "J"
Public Const PLOpenCol = "N"
Public Const ManageWinnerRate = 0.5
Public Const StopLoseRate = -3
Public Const ST_Strangle = "STRANGLE"
Public Const ST_Straddle = "STRADDLE"
Public Const ST_Naked = "SINGLE"
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
    firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Value
    firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Value
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty)
    ElseIf GetStrategyName() = ST_IC Then
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        thirdPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(2, 0).Value
        thirdQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(2, 0).Value
        fourthPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(3, 0).Value
        fourthQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(3, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty + thirdPrice * thirdQty + fourthPrice * fourthQty)
    ElseIf GetStrategyName() = ST_Naked Then
        totalPremium = -(firstPrice * firstQty)
    End If
    GetInitPremium = totalPremium
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

Function GetBuyingPower()
    firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Value
    firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Value
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty)
    ElseIf GetStrategyName() = ST_IC Then
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(1, 0).Value
        thirdPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(2, 0).Value
        thirdQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(2, 0).Value
        fourthPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(InitPremiumCol)).Offset(3, 0).Value
        fourthQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(QtyCol)).Offset(3, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty + thirdPrice * thirdQty + fourthPrice * fourthQty)
    ElseIf GetStrategyName() = ST_Naked Then
        totalPremium = -(firstPrice * firstQty)
    End If
    GetBuyingPower = totalPremium
End Function
Function GetBreakEven()
    GetBreakEven = GetBreakEvenUpLow(False)
End Function
Function GetBreakEvenUp()
    GetBreakEvenUp = GetBreakEvenUpLow(False)
End Function
Function GetBreakEvenLow()
    GetBreakEvenLow = GetBreakEvenUpLow(True)
End Function

Private Function GetBreakEvenUpLow(isLower As Boolean)
    currentRow = Application.Caller.Row
    firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrikeCol)).Value
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        If (isLower) Then
            secondStrikePrice = ActiveSheet.Cells(IIf(currentRow = GetGroupFirstRow(), currentRow + 1, currentRow), Col_Letter_To_Number(StrikeCol)).Value
            bep = WorksheetFunction.Min(firstStrikePrice, secondStrikePrice) - GetInitPremium()
        Else
            secondStrikePrice = ActiveSheet.Cells(IIf(currentRow = GetGroupFirstRow(), currentRow + 1, currentRow - 1), Col_Letter_To_Number(StrikeCol)).Value
            bep = WorksheetFunction.Max(firstStrikePrice, secondStrikePrice) + GetInitPremium()
        End If
    ElseIf GetStrategyName() = ST_IC Then
        If (isLower) Then
            thirdStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrikeCol)).Offset(2, 0).Value
            fourthStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrikeCol)).Offset(3, 0).Value
            bep = WorksheetFunction.Min(thirdStrikePrice, fourthStrikePrice) - GetInitPremium()
        Else
            secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrikeCol)).Offset(1, 0).Value
            bep = WorksheetFunction.Min(firstStrikePrice, secondStrikePrice) + GetInitPremium()
        End If
    ElseIf GetStrategyName() = ST_Naked Then
        If GetStrategyType() = "PUT" Then
            bep = firstStrikePrice - GetInitPremium()
        Else
            bep = firstStrikePrice + GetInitPremium()
        End If
    End If
    GetBreakEvenUpLow = bep
End Function

Private Function GetStrategyName()
    GetStrategyName = UCase(ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrategyCol)).Value)
End Function

Private Function GetStrategyType()
    GetStrategyType = UCase(ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(StrategyTypeCol)).Value)
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

