#!/bin/bash

# Script to add BreadcrumbSchema to all partner pages

# Array of partner information: slug|display-name
partners=(
  "viessmann|Viessmann"
  "vaillant|Vaillant"
  "buderus|Buderus"
  "stiebel-eltron|Stiebel Eltron"
  "junkers|Junkers"
  "bosch|Bosch"
  "daikin|Daikin"
  "wolf|Wolf"
)

for partner_info in "${partners[@]}"; do
  IFS='|' read -r slug display_name <<< "$partner_info"
  file="src/app/partner/$slug/page.tsx"

  if [ ! -f "$file" ]; then
    echo "File not found: $file"
    continue
  fi

  echo "Processing $slug..."

  # Check if breadcrumb already added
  if grep -q "BreadcrumbSchema" "$file"; then
    echo "  Breadcrumb already added to $slug, skipping..."
    continue
  fi

  # Add import for BreadcrumbSchema after lucide-react import
  sed -i '' '/} from "lucide-react";$/a\
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
' "$file"

  # Find and add BreadcrumbSchema at the beginning of return statement
  # Look for "export default function" then "return (" then add breadcrumb
  sed -i '' '/^export default function.*() {$/,/^  return ($/{
    /^  return ($/a\
    <>\
      {/* Schema.org Breadcrumb Structured Data */}\
      <BreadcrumbSchema\
        items={[\
          { name: "Startseite", url: "" },\
          { name: "Partner", url: "/partner" },\
          { name: "'"$display_name"'", url: "/partner/'"$slug"'" },\
        ]}\
      />
  }' "$file"

  echo "  ✓ Added breadcrumb to $slug"
done

echo "Done! Breadcrumb schema added to all partner pages."
