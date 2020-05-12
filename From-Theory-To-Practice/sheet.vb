Public Const Row_BetaWeight = 1

Public Const Col_Time = "A"
Public Const Col_Strategy = "B"
Public Const Col_PLOpen = "F"
Public Const Col_Closing = "H"
Public Const Col_Symbol = "J"
Public Const Col_Group = "K"
Public Const Col_Qty = "M"
Public Const Col_Strike = "O"
Public Const Col_StrategyType = "P"
Public Const Col_InitPremium = "Q"
Public Const Col_MarketPremium = "T"
Public Const Col_Delta = "V"
Public Const Col_Beta = "W"
Public Const ST_Strangle = "STRANGLE"
Public Const ST_Straddle = "STRADDLE"
Public Const ST_Naked = "SINGLE"
Public Const ST_IC = "IC"
Public Const BuyingPower_Rate = 0.2
Public Const BuyingPower10_Rate = 0.1
Public Const ManageWinnerRate = 0.5
Public Const StopLoseRate = -3

Function GetBetaWeightedDelta()
    Application.Volatile
    currentRow = Application.Caller.Row
    spyClosingPrice = ActiveSheet.Cells(Row_BetaWeight, Col_Letter_To_Number(Col_Closing)).Value
    qty = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Qty)).Value
    Delta = 100 * ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Delta)).Value
    beta = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Beta)).Value
    strikePrice = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Strike)).Value

    GetBetaWeightedDelta = qty * strikePrice * beta * Delta * (1 / spyClosingPrice)
End Function


Function GetPLOpenPercentage()
    Application.Volatile
    plOpen = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_PLOpen)).Value
    GetPLOpenPercentage = plOpen / (GetInitPremium() * 100)
End Function

Function GetGroup()
    '=IF(E2=E1,F1,F1+1)
    Application.Volatile
    currentRow = Application.Caller.Row
    previousGroup = ActiveSheet.Cells(currentRow - 1, Col_Letter_To_Number(Col_Group)).Value
    previousSymbol = ActiveSheet.Cells(currentRow - 1, Col_Letter_To_Number(Col_Symbol)).Value
    currentSymbol = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Symbol)).Value
    previousTime = ActiveSheet.Cells(currentRow - 1, Col_Letter_To_Number(Col_Time)).Value
    currentTime = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Time)).Value
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
    GetInitPremium = GetPremium(Col_InitPremium)
End Function

Function GetPLOpen()
    Application.Volatile
    GetPLOpen = 100 * (GetPremium(Col_InitPremium) - GetPremium(Col_MarketPremium))
End Function

Function GetManageWinnerAt()
    Application.Volatile
    GetManageWinnerAt = GetInitPremium() * 100 * ManageWinnerRate
End Function

Function GetStopLoseAt()
    Application.Volatile
    If GetStrategyName() = ST_IC Then
        firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Value
        firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Value
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(1, 0).Value
        stopLose = -(firstStrikePrice * firstQty + secondStrikePrice * secondQty - GetInitPremium()) * 100
    Else
        stopLose = GetInitPremium() * 100 * StopLoseRate
    End If
    GetStopLoseAt = stopLose
End Function

Function GetBreakEvenPosition()
    Application.Volatile
    closingPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Closing)).Value
    GetBreakEvenPosition = (closingPrice - GetBreakEvenLow()) / (GetBreakEvenUp() - GetBreakEvenLow())
End Function

Function GetBreakEven()
    Application.Volatile
    GetBreakEven = GetBreakEvenUpLow(False)
End Function

Function GetBreakEvenUp()
    Application.Volatile
    GetBreakEvenUp = GetBreakEvenUpLow(False)
End Function

Function GetBreakEvenLow()
    Application.Volatile
    GetBreakEvenLow = GetBreakEvenUpLow(True)
End Function
Function GetNotionValue()
    firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Value
    firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Value
    firstStrikeType = GetStrategyType()

    If GetStrategyName() = ST_Strangle Then
        totalNV = firstStrikePrice * firstQty * 100
    ElseIf GetStrategyName() = ST_Straddle Then
        totalNV = firstStrikePrice * firstQty * 100
    ElseIf GetStrategyName() = ST_IC Then
        totalNV = GetBuyingPower()
    ElseIf GetStrategyName() = ST_Naked Then
        totalNV = firstStrikePrice * firstQty * 100
    End If
    
    GetNotionValue = totalNV
    
End Function
Function GetBuyingPower()
    Application.Volatile
    closingPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Closing)).Value
    firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Value
    firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Value
    firstStrikeType = GetStrategyType()
    firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_InitPremium)).Value
    baseBp = closingPrice * BuyingPower_Rate
    
    If GetStrategyName() = ST_Strangle Then
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        
        If firstStrikeType = "CALL" Then
            If closingPrice < firstStrikePrice And closingPrice > secondStrikePrice Then
                ' Healthy
                totalBP = baseBp - WorksheetFunction.Min(firstStrikePrice - closingPrice, closingPrice - secondStrikePrice) + GetInitPremium()
            ElseIf closingPrice > firstStrikePrice Then
                ' Call ITM
                totalBP = baseBp - (firstStrikePrice - closingPrice) + GetInitPremium()
            Else
                ' Put ITM
                totalBP = baseBp - (secondStrikePrice - closingPrice) + GetInitPremium()
            End If
        End If
        
        totalBP = totalBP * firstQty * 100
    ElseIf GetStrategyName() = ST_Straddle Then
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        
        If firstStrikeType = "CALL" Then
            If closingPrice > firstStrikePrice Then
                ' Call ITM
                totalBP = baseBp - (firstStrikePrice - closingPrice) + GetInitPremium()
            Else
                ' Put ITM
                totalBP = baseBp - (secondStrikePrice - closingPrice) + GetInitPremium()
            End If
        End If
        
        totalBP = totalBP * firstQty * 100
    ElseIf GetStrategyName() = ST_IC Then
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        thirdStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(2, 0).Value
        fourthStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(3, 0).Value
        thirdQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(2, 0).Value
        
        totalBP = WorksheetFunction.Max(firstQty * (secondStrikePrice - firstStrikePrice), thirdQty * (thirdStrikePrice - fourthStrikePrice)) * 100
    ElseIf GetStrategyName() = ST_Naked Then
        If firstStrikeType = "PUT" Then
            totalBP = baseBp - (closingPrice - firstStrikePrice) + GetInitPremium()
        Else
            totalBP = baseBp - (firstStrikePrice - closingPrice) + GetInitPremium()
        End If
        
        totalBP = totalBP * firstQty * 100
    End If
    GetBuyingPower = WorksheetFunction.Min(totalBP, GetBuyingPower10())
End Function

Private Function GetBuyingPower10()
    closingPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Closing)).Value
    firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Value
    firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Value
    firstStrikeType = GetStrategyType()
    firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_InitPremium)).Value
    
    If GetStrategyName() = ST_Strangle Then
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        
        If firstStrikeType = "CALL" Then
            baseCallBp = closingPrice * BuyingPower10_Rate
            basePutBp = secondStrikePrice * BuyingPower10_Rate
            baseBp = WorksheetFunction.Max(baseCallBp, basePutBp) + GetInitPremium()
        End If
        
        totalBP = baseBp * firstQty * 100
    ElseIf GetStrategyName() = ST_Straddle Then
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        
        If firstStrikeType = "CALL" Then
            If closingPrice > firstStrikePrice Then
                ' Call ITM
                baseBp = closingPrice * BuyingPower10_Rate
                totalBP = baseBp + GetInitPremium()
            Else
                ' Put ITM
                baseBp = secondStrikePrice * BuyingPower10_Rate
                totalBP = baseBp + GetInitPremium()
            End If
        End If
        
        totalBP = totalBP * firstQty * 100
    ElseIf GetStrategyName() = ST_IC Then
        secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
        thirdStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(2, 0).Value
        fourthStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(3, 0).Value
        thirdQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(2, 0).Value
        
        totalBP = WorksheetFunction.Max(firstQty * (secondStrikePrice - firstStrikePrice), thirdQty * (thirdStrikePrice - fourthStrikePrice)) * 100
    ElseIf GetStrategyName() = ST_Naked Then
    
        If firstStrikeType = "PUT" Then
            baseBp = firstStrikePrice * BuyingPower10_Rate
        Else
            baseBp = closingPrice * BuyingPower10_Rate
        End If
        
        totalBP = (baseBp + GetInitPremium()) * firstQty * 100
    End If
    
    GetBuyingPower10 = totalBP
End Function

Private Function GetPremium(priceCol As String)
    firstPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(priceCol)).Value
    firstQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Value
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(priceCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(1, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty)
    ElseIf GetStrategyName() = ST_IC Then
        secondPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(priceCol)).Offset(1, 0).Value
        secondQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(1, 0).Value
        thirdPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(priceCol)).Offset(2, 0).Value
        thirdQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(2, 0).Value
        fourthPrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(priceCol)).Offset(3, 0).Value
        fourthQty = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Qty)).Offset(3, 0).Value
        totalPremium = -(firstPrice * firstQty + secondPrice * secondQty + thirdPrice * thirdQty + fourthPrice * fourthQty)
    ElseIf GetStrategyName() = ST_Naked Then
        totalPremium = -(firstPrice * firstQty)
    End If
    GetPremium = totalPremium
End Function
Private Function GetBreakEvenUpLow(isLower As Boolean)
    currentRow = Application.Caller.Row
    firstStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Value
    If GetStrategyName() = ST_Strangle Or GetStrategyName() = ST_Straddle Then
        If (isLower) Then
            secondStrikePrice = ActiveSheet.Cells(IIf(currentRow = GetGroupFirstRow(), currentRow + 1, currentRow), Col_Letter_To_Number(Col_Strike)).Value
            bep = WorksheetFunction.Min(firstStrikePrice, secondStrikePrice) - GetInitPremium()
        Else
            secondStrikePrice = ActiveSheet.Cells(IIf(currentRow = GetGroupFirstRow(), currentRow + 1, currentRow - 1), Col_Letter_To_Number(Col_Strike)).Value
            bep = WorksheetFunction.Max(firstStrikePrice, secondStrikePrice) + GetInitPremium()
        End If
    ElseIf GetStrategyName() = ST_IC Then
        If (isLower) Then
            thirdStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(2, 0).Value
            fourthStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(3, 0).Value
            bep = WorksheetFunction.Min(thirdStrikePrice, fourthStrikePrice) - GetInitPremium()
        Else
            secondStrikePrice = ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strike)).Offset(1, 0).Value
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
    GetStrategyName = UCase(ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_Strategy)).Value)
End Function

Private Function GetStrategyType()
    GetStrategyType = UCase(ActiveSheet.Cells(GetGroupFirstRow(), Col_Letter_To_Number(Col_StrategyType)).Value)
End Function

Private Function GetGroupFirstRow()
    currentRow = Application.Caller.Row
    If ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Group)).Value = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Group)).Offset(1, 0).Value Then
        If ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Group)).Value = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Group)).Offset(-1, 0).Value Then
            first_Row = currentRow - 1
        Else
            first_Row = currentRow
        End If
    ElseIf ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Group)).Value = ActiveSheet.Cells(currentRow, Col_Letter_To_Number(Col_Group)).Offset(-1, 0).Value Then
        first_Row = currentRow - 1
    Else
        first_Row = currentRow
    End If
    GetGroupFirstRow = first_Row
End Function

Private Function Col_Letter_To_Number(ColumnLetter As String) As Double
    Dim cNum As Double
        
    'Get Column Number from Alphabet
    cNum = Range(ColumnLetter & "1").Column
    
    'Return Column Number
    Col_Letter_To_Number = cNum
End Function
