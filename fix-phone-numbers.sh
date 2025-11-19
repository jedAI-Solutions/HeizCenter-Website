#!/bin/bash

# Script to fix all phone number formats for NAP consistency
# Replace "+49 8234 96659 00" with "+49 8234 9665900"

echo "🔧 Fixing phone number formats for NAP consistency..."
echo ""

# Define the search pattern and replacement
SEARCH="+49 8234 96659 00"
REPLACE="+49 8234 9665900"

# Counter
count=0

# Find and replace in all .tsx and .ts files
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | while IFS= read -r -d '' file; do
  if grep -q "$SEARCH" "$file"; then
    echo "📝 Updating: $file"
    sed -i '' "s/$SEARCH/$REPLACE/g" "$file"
    ((count++))
  fi
done

echo ""
echo "✅ Done! Updated $count files"
echo ""
echo "Standard format now: $REPLACE"
echo "  - Anzeige: +49 8234 9665900"
echo "  - tel: Link: tel:+4982349665900"
echo "  - Schema: +4982349665900"
