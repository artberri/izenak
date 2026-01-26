#!/usr/bin/env node

/**
 * This script detects duplicate names in scraper/names.json
 * It categorizes duplicates as:
 * - Exact duplicates (same name, gender, and meaning)
 * - Same gender duplicates (same name and gender, different meaning)
 * - Different gender entries (same name, different genders - likely intentional)
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const namesFilePath = path.join(root, "scraper", "names.json");

const checkDuplicates = async () => {
  try {
    if (!fs.existsSync(namesFilePath)) {
      console.error(`File not found: ${namesFilePath}`);
      process.exit(1);
    }

    const data = await fs.promises.readFile(namesFilePath, "utf-8");
    const names = JSON.parse(data);

    console.log(`Total entries: ${names.length}\n`);

    // Group entries by name
    const nameGroups = new Map();
    for (const entry of names) {
      const key = entry.name;
      if (!nameGroups.has(key)) {
        nameGroups.set(key, []);
      }
      nameGroups.get(key).push(entry);
    }

    // Find duplicates (names with more than one entry)
    const duplicates = Array.from(nameGroups.entries()).filter(
      ([_, entries]) => entries.length > 1
    );

    if (duplicates.length === 0) {
      console.log("No duplicate names found.");
      return;
    }

    console.log(`Found ${duplicates.length} names with multiple entries:\n`);

    const exactDuplicates = [];
    const sameGenderDuplicates = [];
    const differentGenderEntries = [];

    for (const [name, entries] of duplicates) {
      const genders = new Set(entries.map((e) => e.gender));

      if (genders.size === 1) {
        // Same gender - check if exact duplicate
        const meanings = new Set(entries.map((e) => e.meaning));
        if (meanings.size === 1) {
          exactDuplicates.push({ name, entries });
        } else {
          sameGenderDuplicates.push({ name, entries });
        }
      } else {
        // Different genders - likely intentional
        differentGenderEntries.push({ name, entries });
      }
    }

    // Report exact duplicates
    if (exactDuplicates.length > 0) {
      console.log("=== EXACT DUPLICATES (should be removed) ===");
      for (const { name, entries } of exactDuplicates) {
        console.log(`\n  ${name} (${entries.length} identical entries)`);
        console.log(`    Gender: ${entries[0].gender}`);
        console.log(
          `    Meaning: ${entries[0].meaning.substring(0, 60)}${entries[0].meaning.length > 60 ? "..." : ""}`
        );
      }
      console.log();
    }

    // Report same gender duplicates with different meanings
    if (sameGenderDuplicates.length > 0) {
      console.log("=== SAME GENDER DUPLICATES (review needed) ===");
      for (const { name, entries } of sameGenderDuplicates) {
        console.log(`\n  ${name} (${entries.length} entries, same gender)`);
        console.log(`    Gender: ${entries[0].gender}`);
        for (let i = 0; i < entries.length; i++) {
          console.log(
            `    Meaning ${i + 1}: ${entries[i].meaning.substring(0, 60)}${entries[i].meaning.length > 60 ? "..." : ""}`
          );
        }
      }
      console.log();
    }

    // Report different gender entries (likely intentional)
    if (differentGenderEntries.length > 0) {
      console.log("=== DIFFERENT GENDER ENTRIES (likely intentional) ===");
      for (const { name, entries } of differentGenderEntries) {
        const genders = entries.map((e) => e.gender).join(", ");
        console.log(`\n  ${name} (${entries.length} entries)`);
        console.log(`    Genders: ${genders}`);
      }
      console.log();
    }

    // Summary
    console.log("=== SUMMARY ===");
    console.log(`  Exact duplicates: ${exactDuplicates.length}`);
    console.log(`  Same gender duplicates: ${sameGenderDuplicates.length}`);
    console.log(
      `  Different gender entries (intentional): ${differentGenderEntries.length}`
    );
    console.log(
      `  Total duplicate names to review: ${exactDuplicates.length + sameGenderDuplicates.length}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

void checkDuplicates();
