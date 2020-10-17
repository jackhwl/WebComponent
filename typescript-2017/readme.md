# Primitive Types
* Primitive values aren't object, and have no methods*
* Six primitive types in JS:
    * null
    * underfined
    * boolean
    * number
    * string
    * symbol ES2015: the name of the symbol is equal to it's value
* Everything else extends from: Object 
* Object is mutable values, everything else is immutable
* Auto-Boxing
    * When cnecessary, primitive types are "wrapped" by identically-named Objects, and then back to their primitive types again.
# Declaration:
* var declarations **ARE** hoisted, and **ARE NOT** block-scoped, belong to the function or global scope they're defined in
* let declarations **ARE NOT** hoisted, and **ARE** block-scoped, belong to the block scope they're defined in
* const declarations **ARE NOT** hoisted, re-assignment is not allowed, does NOT mean "immutable value"
* Recommended practice: for mutable values, use with Object.freeze

||var|let|const
---|---|---|---|---
Reassign|✅|✅|
Scope|function|block|block
hoisted|✅😫
