#!/bin/bash

# This script provides a convenient way to clear and seed CSS questions.

# Function to display usage
usage() {
  echo "Usage: $0 {clear|seed-all|seed-01-20|seed-21-40|...|seed-2181-2200}"
  echo "  clear        - Clears all questions from the Firebase 'questions' collection."
  echo "  seed-all     - Seeds all CSS questions from all JSON files in sequence."
  echo "  seed-01-20   - Seeds CSS questions from css-01-20.json."
  echo "  seed-21-40   - Seeds CSS questions from css-21-40.json."
  echo "  ...          - And so on for all 110 files."
  echo "  seed-2181-2200 - Seeds CSS questions from css-2181–2200.json."
  exit 1
}

# Check if node is available
if ! command -v node &> /dev/null
then
    echo "node could not be found. Please ensure Node.js is installed."
    exit 1
fi

# Navigate to the project root if not already there
if [[ "$(basename "$PWD")" == "scripts" ]]; then
  echo "Navigating to project root..."
  cd ..
fi

# Execute the requested action
case "$1" in
  clear)
    echo "Executing clear-questions.js..."
    node scripts/clear-questions.js
    ;;
  seed-all)
    echo "Executing seed-all-css-questions.js..."
    node scripts/seed-all-css-questions.js
    ;;
  seed-01-20)
    echo "Executing seed-css-01-20.js..."
    node scripts/seed-css-01-20.js
    ;;
  seed-21-40)
    echo "Executing seed-css-21-40.js..."
    node scripts/seed-css-21-40.js
    ;;
  seed-41-60)
    echo "Executing seed-css-41-60.js..."
    node scripts/seed-css-41-60.js
    ;;
  seed-61-80)
    echo "Executing seed-css-61-80.js..."
    node scripts/seed-css-61-80.js
    ;;
  seed-81-100)
    echo "Executing seed-css-81-100.js..."
    node scripts/seed-css-81-100.js
    ;;
  seed-101-120)
    echo "Executing seed-css-101-120.js..."
    node scripts/seed-css-101-120.js
    ;;
  seed-121-140)
    echo "Executing seed-css-121-140.js..."
    node scripts/seed-css-121-140.js
    ;;
  seed-141-160)
    echo "Executing seed-css-141-160.js..."
    node scripts/seed-css-141-160.js
    ;;
  seed-161-180)
    echo "Executing seed-css-161-180.js..."
    node scripts/seed-css-161-180.js
    ;;
  seed-181-200)
    echo "Executing seed-css-181-200.js..."
    node scripts/seed-css-181-200.js
    ;;
  seed-201-220)
    echo "Executing seed-css-201-220.js..."
    node scripts/seed-css-201-220.js
    ;;
  seed-221-240)
    echo "Executing seed-css-221-240.js..."
    node scripts/seed-css-221-240.js
    ;;
  seed-241-260)
    echo "Executing seed-css-241-260.js..."
    node scripts/seed-css-241-260.js
    ;;
  seed-261-280)
    echo "Executing seed-css-261-280.js..."
    node scripts/seed-css-261-280.js
    ;;
  seed-281-300)
    echo "Executing seed-css-281-300.js..."
    node scripts/seed-css-281-300.js
    ;;
  seed-301-320)
    echo "Executing seed-css-301-320.js..."
    node scripts/seed-css-301-320.js
    ;;
  seed-321-340)
    echo "Executing seed-css-321-340.js..."
    node scripts/seed-css-321-340.js
    ;;
  seed-341-360)
    echo "Executing seed-css-341-360.js..."
    node scripts/seed-css-341-360.js
    ;;
  seed-361-380)
    echo "Executing seed-css-361-380.js..."
    node scripts/seed-css-361-380.js
    ;;
  seed-381-400)
    echo "Executing seed-css-381-400.js..."
    node scripts/seed-css-381-400.js
    ;;
  seed-401-420)
    echo "Executing seed-css-401-420.js..."
    node scripts/seed-css-401-420.js
    ;;
  seed-421-440)
    echo "Executing seed-css-421-440.js..."
    node scripts/seed-css-421-440.js
    ;;
  seed-441-460)
    echo "Executing seed-css-441-460.js..."
    node scripts/seed-css-441-460.js
    ;;
  seed-461-480)
    echo "Executing seed-css-461-480.js..."
    node scripts/seed-css-461-480.js
    ;;
  seed-481-500)
    echo "Executing seed-css-481-500.js..."
    node scripts/seed-css-481-500.js
    ;;
  seed-501-520)
    echo "Executing seed-css-501-520.js..."
    node scripts/seed-css-501-520.js
    ;;
  seed-521-540)
    echo "Executing seed-css-521-540.js..."
    node scripts/seed-css-521-540.js
    ;;
  seed-541-560)
    echo "Executing seed-css-541-560.js..."
    node scripts/seed-css-541-560.js
    ;;
  seed-561-580)
    echo "Executing seed-css-561-580.js..."
    node scripts/seed-css-561-580.js
    ;;
  seed-581-600)
    echo "Executing seed-css-581-600.js..."
    node scripts/seed-css-581-600.js
    ;;
  seed-601-620)
    echo "Executing seed-css-601-620.js..."
    node scripts/seed-css-601-620.js
    ;;
  seed-621-640)
    echo "Executing seed-css-621-640.js..."
    node scripts/seed-css-621-640.js
    ;;
  seed-641-660)
    echo "Executing seed-css-641-660.js..."
    node scripts/seed-css-641-660.js
    ;;
  seed-661-680)
    echo "Executing seed-css-661-680.js..."
    node scripts/seed-css-661-680.js
    ;;
  seed-681-700)
    echo "Executing seed-css-681-700.js..."
    node scripts/seed-css-681-700.js
    ;;
  seed-701-720)
    echo "Executing seed-css-701-720.js..."
    node scripts/seed-css-701-720.js
    ;;
  seed-721-740)
    echo "Executing seed-css-721-740.js..."
    node scripts/seed-css-721-740.js
    ;;
  seed-741-760)
    echo "Executing seed-css-741-760.js..."
    node scripts/seed-css-741-760.js
    ;;
  seed-761-780)
    echo "Executing seed-css-761-780.js..."
    node scripts/seed-css-761-780.js
    ;;
  seed-781-800)
    echo "Executing seed-css-781-800.js..."
    node scripts/seed-css-781-800.js
    ;;
  seed-801-820)
    echo "Executing seed-css-801-820.js..."
    node scripts/seed-css-801-820.js
    ;;
  seed-821-840)
    echo "Executing seed-css-821-840.js..."
    node scripts/seed-css-821-840.js
    ;;
  seed-841-860)
    echo "Executing seed-css-841-860.js..."
    node scripts/seed-css-841-860.js
    ;;
  seed-861-880)
    echo "Executing seed-css-861-880.js..."
    node scripts/seed-css-861-880.js
    ;;
  seed-881-900)
    echo "Executing seed-css-881-900.js..."
    node scripts/seed-css-881-900.js
    ;;
  seed-901-920)
    echo "Executing seed-css-901-920.js..."
    node scripts/seed-css-901-920.js
    ;;
  seed-921-940)
    echo "Executing seed-css-921-940.js..."
    node scripts/seed-css-921-940.js
    ;;
  seed-941-960)
    echo "Executing seed-css-941-960.js..."
    node scripts/seed-css-941-960.js
    ;;
  seed-961-980)
    echo "Executing seed-css-961-980.js..."
    node scripts/seed-css-961-980.js
    ;;
  seed-981-1000)
    echo "Executing seed-css-981-1000.js..."
    node scripts/seed-css-981-1000.js
    ;;
  seed-1001-1020)
    echo "Executing seed-css-1001-1020.js..."
    node scripts/seed-css-1001-1020.js
    ;;
  seed-1021-1040)
    echo "Executing seed-css-1021-1040.js..."
    node scripts/seed-css-1021-1040.js
    ;;
  seed-1041-1060)
    echo "Executing seed-css-1041-1060.js..."
    node scripts/seed-css-1041-1060.js
    ;;
  seed-1061-1080)
    echo "Executing seed-css-1061-1080.js..."
    node scripts/seed-css-1061-1080.js
    ;;
  seed-1081-1100)
    echo "Executing seed-css-1081-1100.js..."
    node scripts/seed-css-1081-1100.js
    ;;
  seed-1101-1120)
    echo "Executing seed-css-1101-1120.js..."
    node scripts/seed-css-1101-1120.js
    ;;
  seed-1121-1140)
    echo "Executing seed-css-1121-1140.js..."
    node scripts/seed-css-1121-1140.js
    ;;
  seed-1141-1160)
    echo "Executing seed-css-1141-1160.js..."
    node scripts/seed-css-1141-1160.js
    ;;
  seed-1161-1180)
    echo "Executing seed-css-1161-1180.js..."
    node scripts/seed-css-1161-1180.js
    ;;
  seed-1181-1200)
    echo "Executing seed-css-1181-1200.js..."
    node scripts/seed-css-1181-1200.js
    ;;
  seed-1201-1220)
    echo "Executing seed-css-1201-1220.js..."
    node scripts/seed-css-1201-1220.js
    ;;
  seed-1221-1240)
    echo "Executing seed-css-1221-1240.js..."
    node scripts/seed-css-1221-1240.js
    ;;
  seed-1241-1260)
    echo "Executing seed-css-1241-1260.js..."
    node scripts/seed-css-1241-1260.js
    ;;
  seed-1261-1280)
    echo "Executing seed-css-1261-1280.js..."
    node scripts/seed-css-1261-1280.js
    ;;
  seed-1281-1300)
    echo "Executing seed-css-1281-1300.js..."
    node scripts/seed-css-1281-1300.js
    ;;
  seed-1301-1320)
    echo "Executing seed-css-1301-1320.js..."
    node scripts/seed-css-1301-1320.js
    ;;
  seed-1321-1340)
    echo "Executing seed-css-1321-1340.js..."
    node scripts/seed-css-1321-1340.js
    ;;
  seed-1341-1360)
    echo "Executing seed-css-1341-1360.js..."
    node scripts/seed-css-1341-1360.js
    ;;
  seed-1361-1380)
    echo "Executing seed-css-1361-1380.js..."
    node scripts/seed-css-1361-1380.js
    ;;
  seed-1381-1400)
    echo "Executing seed-css-1381-1400.js..."
    node scripts/seed-css-1381-1400.js
    ;;
  seed-1401-1420)
    echo "Executing seed-css-1401-1420.js..."
    node scripts/seed-css-1401-1420.js
    ;;
  seed-1421-1440)
    echo "Executing seed-css-1421-1440.js..."
    node scripts/seed-css-1421-1440.js
    ;;
  seed-1441-1460)
    echo "Executing seed-css-1441-1460.js..."
    node scripts/seed-css-1441-1460.js
    ;;
  seed-1461-1480)
    echo "Executing seed-css-1461-1480.js..."
    node scripts/seed-css-1461-1480.js
    ;;
  seed-1481-1500)
    echo "Executing seed-css-1481-1500.js..."
    node scripts/seed-css-1481-1500.js
    ;;
  seed-1501-1520)
    echo "Executing seed-css-1501-1520.js..."
    node scripts/seed-css-1501-1520.js
    ;;
  seed-1521-1540)
    echo "Executing seed-css-1521-1540.js..."
    node scripts/seed-css-1521-1540.js
    ;;
  seed-1541-1560)
    echo "Executing seed-css-1541-1560.js..."
    node scripts/seed-css-1541-1560.js
    ;;
  seed-1561-1580)
    echo "Executing seed-css-1561-1580.js..."
    node scripts/seed-css-1561-1580.js
    ;;
  seed-1581-1600)
    echo "Executing seed-css-1581-1600.js..."
    node scripts/seed-css-1581-1600.js
    ;;
  seed-1601-1620)
    echo "Executing seed-css-1601-1620.js..."
    node scripts/seed-css-1601-1620.js
    ;;
  seed-1621-1640)
    echo "Executing seed-css-1621-1640.js..."
    node scripts/seed-css-1621-1640.js
    ;;
  seed-1641-1660)
    echo "Executing seed-css-1641-1660.js..."
    node scripts/seed-css-1641-1660.js
    ;;
  seed-1661-1680)
    echo "Executing seed-css-1661-1680.js..."
    node scripts/seed-css-1661-1680.js
    ;;
  seed-1681-1700)
    echo "Executing seed-css-1681-1700.js..."
    node scripts/seed-css-1681-1700.js
    ;;
  seed-1701-1720)
    echo "Executing seed-css-1701-1720.js..."
    node scripts/seed-css-1701-1720.js
    ;;
  seed-1721-1740)
    echo "Executing seed-css-1721-1740.js..."
    node scripts/seed-css-1721-1740.js
    ;;
  seed-1741-1760)
    echo "Executing seed-css-1741-1760.js..."
    node scripts/seed-css-1741-1760.js
    ;;
  seed-1761-1780)
    echo "Executing seed-css-1761-1780.js..."
    node scripts/seed-css-1761-1780.js
    ;;
  seed-1781-1800)
    echo "Executing seed-css-1781-1800.js..."
    node scripts/seed-css-1781-1800.js
    ;;
  seed-1801-1820)
    echo "Executing seed-css-1801-1820.js..."
    node scripts/seed-css-1801-1820.js
    ;;
  seed-1821-1840)
    echo "Executing seed-css-1821-1840.js..."
    node scripts/seed-css-1821-1840.js
    ;;
  seed-1841-1860)
    echo "Executing seed-css-1841-1860.js..."
    node scripts/seed-css-1841-1860.js
    ;;
  seed-1861-1880)
    echo "Executing seed-css-1861-1880.js..."
    node scripts/seed-css-1861-1880.js
    ;;
  seed-1881-1900)
    echo "Executing seed-css-1881-1900.js..."
    node scripts/seed-css-1881-1900.js
    ;;
  seed-1901-1920)
    echo "Executing seed-css-1901-1920.js..."
    node scripts/seed-css-1901-1920.js
    ;;
  seed-1921-1940)
    echo "Executing seed-css-1921-1940.js..."
    node scripts/seed-css-1921-1940.js
    ;;
  seed-1941-1960)
    echo "Executing seed-css-1941-1960.js..."
    node scripts/seed-css-1941-1960.js
    ;;
  seed-1961-1980)
    echo "Executing seed-css-1961-1980.js..."
    node scripts/seed-css-1961-1980.js
    ;;
  seed-1981-2000)
    echo "Executing seed-css-1981-2000.js..."
    node scripts/seed-css-1981-2000.js
    ;;
  seed-2001-2020)
    echo "Executing seed-css-2001-2020.js..."
    node scripts/seed-css-2001-2020.js
    ;;
  seed-2021-2040)
    echo "Executing seed-css-2021-2040.js..."
    node scripts/seed-css-2021-2040.js
    ;;
  seed-2041-2060)
    echo "Executing seed-css-2041-2060.js..."
    node scripts/seed-css-2041-2060.js
    ;;
  seed-2061-2080)
    echo "Executing seed-css-2061-2080.js..."
    node scripts/seed-css-2061-2080.js
    ;;
  seed-2081-2100)
    echo "Executing seed-css-2081-2100.js..."
    node scripts/seed-css-2081-2100.js
    ;;
  seed-2101-2120)
    echo "Executing seed-css-2101-2120.js..."
    node scripts/seed-css-2101-2120.js
    ;;
  seed-2121-2140)
    echo "Executing seed-css-2121-2140.js..."
    node scripts/seed-css-2121-2140.js
    ;;
  seed-2141-2160)
    echo "Executing seed-css-2141-2160.js..."
    node scripts/seed-css-2141-2160.js
    ;;
  seed-2161-2180)
    echo "Executing seed-css-2161-2180.js..."
    node scripts/seed-css-2161-2180.js
    ;;
  seed-2181-2200)
    echo "Executing seed-css-2181-2200.js..."
    node scripts/seed-css-2181-2200.js
    ;;
  *)
    usage
    ;;
esac
