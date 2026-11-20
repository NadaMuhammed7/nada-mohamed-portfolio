# Extracted Dashboard Queries & Panel Architecture

## Belts Stock Management (UID: `-ZGnalXHz`)
- **Category**: Material & Inventory
- **Folder**: General
- **Total Panels**: 30

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`table`)
```sql
SELECT 
    concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR) as Card,
  t.TRC_START_TIME + INTERVAL '7' day AS "Exp Date",
    CASE 
      WHEN KB.BOBIN_BARCODE is NOT NULL
       THEN BOBIN_BARCODE
       ELSE 'Missing'
       end as "Bobbin Barcode",
    t.TRC_START_TIME as "Prod Date",
    m.MAT_CODE as "Short Code",
    CU.CU_GOOD_QTY AS Quantity,
    CU.CU_REMANING_QTY AS "Remaining Quantity",
    DATE_PART('day', (t.TRC_START_TIME + INTERVAL '7' day) - CURRENT_DATE) AS "Days to Expire",
    CASE 
        WHEN ("Days to Expire" <= 0) 
            THEN 'Expired'
        WHEN ("Days to Expire" <= 3)
            THEN 'Critical'
        ELSE 'Good'
    END AS "Status"

FROM "EG_CA_TRU_FAC_PCS02"."WMS_TRACEABILITY" t
left JOIN EG_CA_TRU_FAC_PCS02.MD_MATERIALS m
    ON t.TRC_MAT_SAP_CODE = m.MAT_SAP_CODE
left join "EG_CA_TRU_FAC_LOC01".TPL."tbl_KB_Kusak_Bobin"  KB
    on concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR) = KB."PCS_BARCODE"
left join "EG_CA_TRU_FAC_PCS02"."DC_CONTAINMENT_UNITS" CU 
   on concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR)=concat(CU.SO_CODE, CU.CU_EXT_PROGR)
WHERE t.TRC_FL_PHASE = 'P' -- That Material has Production
  AND t.TRC_MCH_CODE = 'TT901' -- The machine you wanted
  AND NOT EXISTS (
      SELECT 1
      FROM "EG_CA_TRU_FAC_PCS02"."WMS_TRACEABILITY" x
      WHERE x.TRC_SO_CODE = t.TRC_SO_CODE
        AND x.TRC_CU_EXT_PROGR = t.TRC_CU_EXT_PROGR
        AND x.TRC_FL_PHASE = 'C' -- Don't have Consumption 
  )
  AND $__timeFilter(t.TRC_START_TIME)
ORDER BY t.TRC_START_TIME ASC;
```

#### Panel: Untitled Panel (`table`)
```sql
SELECT 
    concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR) as Card,
        t.TRC_START_TIME + INTERVAL '7' day AS "Exp Date",

    CASE 
      WHEN KB.BOBIN_BARCODE is NOT NULL
       THEN BOBIN_BARCODE
       ELSE 'Missing'
       end as "Bobbin Barcode",
    t.TRC_START_TIME as "Prod Date",
    m.MAT_CODE as "Short Code",
    CU.CU_GOOD_QTY AS Quantity,
    CU.CU_REMANING_QTY AS "Remaining Quantity",
    DATE_PART('day', (t.TRC_START_TIME + INTERVAL '7' day) - CURRENT_DATE) AS "Days to Expire",
    CASE 
        WHEN ("Days to Expire" <= 0) 
            THEN 'Expired'
        WHEN ("Days to Expire" <= 3)
            THEN 'Critical'
        ELSE 'Good'
    END AS "Status"

FROM "EG_CA_TRU_FAC_PCS02"."WMS_TRACEABILITY" t
left JOIN EG_CA_TRU_FAC_PCS02.MD_MATERIALS m
    ON t.TRC_MAT_SAP_CODE = m.MAT_SAP_CODE
left join "EG_CA_TRU_FAC_LOC01".TPL."tbl_KB_Kusak_Bobin"  KB
    on concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR) = KB."PCS_BARCODE"
left join "EG_CA_TRU_FAC_PCS02"."DC_CONTAINMENT_UNITS" CU 
   on concat(t.TRC_SO_CODE, t.TRC_CU_EXT_PROGR)=concat(CU.SO_CODE, CU.CU_EXT_PROGR)
WHERE t.TRC_FL_PHASE = 'P' -- That Material has Production
  AND t.TRC_MCH_CODE = 'TT902' -- The machine you wanted
  AND NOT EXISTS (
      SELECT 1
      FROM "EG_CA_TRU_FAC_PCS02"."WMS_TRACEABILITY" x
      WHERE x.TRC_SO_CODE = t.TRC_SO_CODE
        AND x.TRC_CU_EXT_PROGR = t.TRC_CU_EXT_PROGR
        AND x.TRC_FL_PHASE = 'C' -- Don't have Consumption 
  )
  AND $__timeFilter(t.TRC_START_TIME)
ORDER BY t.TRC_START_TIME ASC;
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

---

## C&B (UID: `OURBmYRDk`)
- **Category**: HR Analytics
- **Folder**: HR
- **Total Panels**: 40
- **Variables**: Department, Job_Family, Month, Year

### Key Panels & SQL Analysis

#### Panel: Total Headcount (`stat`)
```sql
SELECT
distinct Job_Family_Value
FROM
  "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE
  KPI= 'Headcount' and Job_Family = 'Total'
  and UM = 'Numb' 
  AND "Month" in ($Month) 
  and "year" in ($Year)
  AND Area = 'Compensation & Benefits'
```

#### Panel: Total Overtime % (`stat`)
```sql
SELECT
distinct Job_Family_Value
FROM
  "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE
  KPI= 'Overtime %' and UM = 'Percent' and Job_Family = 'Total'
   AND "Month" in ($Month) 
  and "year" in ($Year)
  AND Area = 'Compensation & Benefits'
```

#### Panel: Headcount Per Job Family (`barchart`)
```sql
SELECT
  distinct Job_Family
,
  Job_Family_Value
FROM
  "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE
  KPI= 'Headcount' and UM = 'Numb' 
  AND "Month" in ($Month) 
  and "year" in ($Year) and Job_Family != 'Total'
  AND Area = 'Compensation & Benefits'
  and Job_Family_Value != 0
order by Job_Family_Value desc
```

#### Panel: Overtime % Per Job Family (`barchart`)
```sql
SELECT
Distinct Job_Family,
  Job_Family_Value
  
FROM
  "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE
  KPI= 'Overtime %' and UM = 'Percent' 
  AND "Month" in ($Month) 
  and "year" in ($Year) and Job_Family != 'Total'
  AND Area = 'Compensation & Benefits'
  and Job_Family_Value !=  0
order by Job_Family_Value desc
```

#### Panel: Headcount Per Department (`barchart`)
```sql
SELECT
  Department_Value,
  Department
FROM
  "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE
  KPI= 'Headcount' and UM = 'Numb'
  AND "Month" in ($Month) 
  and "year" in ($Year)
  AND Area = 'Compensation & Benefits'
  and Department_Value > 0
  and Job_Family in ($Job_Family)
order by Department_Value desc
```

#### Panel: Overtime % Per Department (`barchart`)
```sql
SELECT
  distinct Department_Value,
Department 
FROM
  "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE
  KPI= 'Overtime %' and UM = 'Percent' and Department !='Total'
  AND "Month" in ($Month) 
  and "year" in ($Year)
  AND Area = 'Compensation & Benefits'
  and Department_Value > 0
    and Job_Family in ($Job_Family)
order by Department_Value desc
```

---

## Curing Moulds Mapping (UID: `rch0wYQDz`)
- **Category**: Process & Curing
- **Folder**: 1.ON DEVELOPMENT
- **Total Panels**: 89

### Key Panels & SQL Analysis

#### Panel: Press A0 (`table`)
```sql
SELECT attr AS "Attribute", left_val AS "Left Cavity", right_val AS "Right Cavity" FROM (

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PRESS' AS attr, '01' AS sort_idx,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/L') AS left_val,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/R') AS right_val
    FROM (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_left
    LEFT JOIN (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'SIZE' AS attr, '02' AS sort_idx,
        p_left.size AS left_val,
        p_right.size AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PATTERN' AS attr, '03' AS sort_idx,
        p_left.tread_pattern AS left_val,
        p_right.tread_pattern AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'IP CODE' AS attr, '04' AS sort_idx,
        p_left.ip_code AS left_val,
        p_right.ip_code AS right_val
    FROM (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'MOULD No.' AS attr, '05' AS sort_idx,
        p_left.mould_no AS left_val,
        p_right.mould_no AS right_val
    FROM (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

) t
WHERE press = 'A0'
ORDER BY sort_idx
```

#### Panel: Press A1 (`table`)
```sql
SELECT attr AS "Attribute", left_val AS "Left Cavity", right_val AS "Right Cavity" FROM (

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PRESS' AS attr, '01' AS sort_idx,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/L') AS left_val,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/R') AS right_val
    FROM (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_left
    LEFT JOIN (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'SIZE' AS attr, '02' AS sort_idx,
        p_left.size AS left_val,
        p_right.size AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PATTERN' AS attr, '03' AS sort_idx,
        p_left.tread_pattern AS left_val,
        p_right.tread_pattern AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'IP CODE' AS attr, '04' AS sort_idx,
        p_left.ip_code AS left_val,
        p_right.ip_code AS right_val
    FROM (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'MOULD No.' AS attr, '05' AS sort_idx,
        p_left.mould_no AS left_val,
        p_right.mould_no AS right_val
    FROM (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

) t
WHERE press = 'A1'
ORDER BY sort_idx
```

#### Panel: Press A2 (`table`)
```sql
SELECT attr AS "Attribute", left_val AS "Left Cavity", right_val AS "Right Cavity" FROM (

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PRESS' AS attr, '01' AS sort_idx,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/L') AS left_val,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/R') AS right_val
    FROM (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_left
    LEFT JOIN (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'SIZE' AS attr, '02' AS sort_idx,
        p_left.size AS left_val,
        p_right.size AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PATTERN' AS attr, '03' AS sort_idx,
        p_left.tread_pattern AS left_val,
        p_right.tread_pattern AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'IP CODE' AS attr, '04' AS sort_idx,
        p_left.ip_code AS left_val,
        p_right.ip_code AS right_val
    FROM (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'MOULD No.' AS attr, '05' AS sort_idx,
        p_left.mould_no AS left_val,
        p_right.mould_no AS right_val
    FROM (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

) t
WHERE press = 'A2'
ORDER BY sort_idx
```

#### Panel: Press A3 (`table`)
```sql
SELECT attr AS "Attribute", left_val AS "Left Cavity", right_val AS "Right Cavity" FROM (

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PRESS' AS attr, '01' AS sort_idx,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/L') AS left_val,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/R') AS right_val
    FROM (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_left
    LEFT JOIN (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'SIZE' AS attr, '02' AS sort_idx,
        p_left.size AS left_val,
        p_right.size AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PATTERN' AS attr, '03' AS sort_idx,
        p_left.tread_pattern AS left_val,
        p_right.tread_pattern AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'IP CODE' AS attr, '04' AS sort_idx,
        p_left.ip_code AS left_val,
        p_right.ip_code AS right_val
    FROM (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'MOULD No.' AS attr, '05' AS sort_idx,
        p_left.mould_no AS left_val,
        p_right.mould_no AS right_val
    FROM (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

) t
WHERE press = 'A3'
ORDER BY sort_idx
```

#### Panel: Press A4 (`table`)
```sql
SELECT attr AS "Attribute", left_val AS "Left Cavity", right_val AS "Right Cavity" FROM (

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PRESS' AS attr, '01' AS sort_idx,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/L') AS left_val,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/R') AS right_val
    FROM (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_left
    LEFT JOIN (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'SIZE' AS attr, '02' AS sort_idx,
        p_left.size AS left_val,
        p_right.size AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PATTERN' AS attr, '03' AS sort_idx,
        p_left.tread_pattern AS left_val,
        p_right.tread_pattern AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'IP CODE' AS attr, '04' AS sort_idx,
        p_left.ip_code AS left_val,
        p_right.ip_code AS right_val
    FROM (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'MOULD No.' AS attr, '05' AS sort_idx,
        p_left.mould_no AS left_val,
        p_right.mould_no AS right_val
    FROM (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

) t
WHERE press = 'A4'
ORDER BY sort_idx
```

#### Panel: Press A5 (`table`)
```sql
SELECT attr AS "Attribute", left_val AS "Left Cavity", right_val AS "Right Cavity" FROM (

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PRESS' AS attr, '01' AS sort_idx,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/L') AS left_val,
        CONCAT(TRIM(COALESCE(p_left.press, p_right.press)), '/R') AS right_val
    FROM (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_left
    LEFT JOIN (
        SELECT S.MCH_CODE AS press FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S 
        WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        GROUP BY S.MCH_CODE
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'SIZE' AS attr, '02' AS sort_idx,
        p_left.size AS left_val,
        p_right.size AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.size_val, t.SIZE_SUB_FAMILY, REGEXP_EXTRACT(m.MAT_DESC, '^[0-9]+(\.[0-9]+)?(R[0-9]+(\.[0-9]+)?)?|([0-9]+\/[0-9]+R[0-9]+(\.[0-9]+)?)', 0), m.MAT_DESC)) AS size
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Size") AS size_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Size" IS NOT NULL AND "Size" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'PATTERN' AS attr, '03' AS sort_idx,
        p_left.tread_pattern AS left_val,
        p_right.tread_pattern AS right_val
    FROM (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT 
            l.press,
            MAX(COALESCE(y.pattern_val, REGEXP_EXTRACT(t."DESC", '([A-Za-z0-9:\-\+]+)$', 1), REGEXP_EXTRACT(m.MAT_DESC, '([A-Za-z0-9:\-\+]+)$', 1), m.MAT_TREAD)) AS tread_pattern
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE
        LEFT JOIN (
            SELECT SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5) AS ip_5, MAX("Pattern") AS pattern_val
            FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
            WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
            GROUP BY SUBSTRING(CAST("IPCode" AS VARCHAR), 1, 5)
        ) y ON SUBSTRING(m.MAT_IP_CODE, 1, 5) = y.ip_5
        LEFT JOIN "EG_CA_TRU_FAC_PCS02"."INFO_TIER" t ON SUBSTRING(CAST(CAST(t.IP_CODE AS BIGINT) AS VARCHAR), 1, 5) = SUBSTRING(m.MAT_IP_CODE, 1, 5)
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'IP CODE' AS attr, '04' AS sort_idx,
        p_left.ip_code AS left_val,
        p_right.ip_code AS right_val
    FROM (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, 
               MAX(CASE 
                   WHEN m.MAT_IP_CODE IS NOT NULL AND m.short_code IS NOT NULL AND m.MAT_IP_CODE <> '' AND m.short_code <> ''
                       THEN CONCAT(m.MAT_IP_CODE, '/', m.short_code)
                   ELSE COALESCE(NULLIF(m.MAT_IP_CODE, ''), NULLIF(m.short_code, ''))
               END) AS ip_code
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MAT_SAP_CODE,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        LEFT JOIN (
            SELECT MAT_SAP_CODE, MAT_IP_CODE, MAT_CODE AS short_code,
                   ROW_NUMBER() OVER (PARTITION BY MAT_SAP_CODE ORDER BY MAT_IMPORT_TIMESTAMP DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
            WHERE MAT_SAP_CODE IS NOT NULL
        ) m ON l.MAT_SAP_CODE = m.MAT_SAP_CODE AND m.rn = 1
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

    UNION ALL

    SELECT 
        COALESCE(p_left.press, p_right.press) AS press,
        'MOULD No.' AS attr, '05' AS sort_idx,
        p_left.mould_no AS left_val,
        p_right.mould_no AS right_val
    FROM (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'L'
        GROUP BY l.press
    ) p_left
    FULL OUTER JOIN (
        SELECT l.press, MAX(REGEXP_REPLACE(l.mould_no, '^[A-Za-z]+', '')) AS mould_no
        FROM (
            SELECT S.MCH_CODE AS press, S.MCN_SIDE AS side, S.MTO_TOOL_CODE_1 AS mould_no,
                   ROW_NUMBER() OVER (PARTITION BY S.MCH_CODE, S.MCN_SIDE ORDER BY S.MTO_START_DATE DESC) AS rn
            FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_TOOL" S
            WHERE S.PP_CODE = 'CU1' AND S.MTO_TOOL_CODE_1 IS NOT NULL
        ) l
        WHERE l.rn = 1 AND l.side = 'R'
        GROUP BY l.press
    ) p_right ON p_left.press = p_right.press

) t
WHERE press = 'A5'
ORDER BY sort_idx
```

---

## Daily Mix Monitoring (UID: `V7Q3D6Yvk`)
- **Category**: Manufacturing & Mixing
- **Folder**: 1.ON DEVELOPMENT
- **Total Panels**: 9
- **Variables**: year, month, day, shift, shortcode

### Key Panels & SQL Analysis

#### Panel: 📊 Executive KPI Summary — Plant Operational Performance (Month ${month} / Day ${day}) (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
    COUNT(DISTINCT "p"."IP5") AS "Total IP Codes",
    CAST(ROUND(SUM(COALESCE("p"."plan_qty", 0))) AS INT) AS "Total Plan",
    SUM(COALESCE("c"."cured_qty", 0)) AS "Total Curing",
    CASE 
        WHEN SUM(COALESCE("p"."plan_qty", 0)) > 0 
        THEN ROUND((CAST(SUM(LEAST(CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT), GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)))) AS DOUBLE) / SUM(COALESCE("p"."plan_qty", 0))) * 100.0, 1)
        ELSE 0 
    END AS "Plant Curing CI",
    CASE 
        WHEN SUM(COALESCE("p"."plan_qty", 0)) > 0 
        THEN ROUND((CAST(SUM(LEAST(CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT), COALESCE("d"."delivered_qty", 0))) AS DOUBLE) / SUM(COALESCE("p"."plan_qty", 0))) * 100.0, 1)
        ELSE 0 
    END AS "Plant Delivery CI",
    COUNT(DISTINCT CASE WHEN COALESCE("sch"."in_curing", 'FALSE') = 'TRUE' THEN "p"."IP5" END) AS "Active Press IP Codes",
    COUNT(DISTINCT CASE WHEN COALESCE("d"."delivered_qty", 0) >= CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AND CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) > 0 THEN "p"."IP5" END) AS "STOP Alerts Count",
    SUM(GREATEST(0, (COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - COALESCE("d"."delivered_qty", 0))) AS "Total Inspection Queue"
FROM (
    SELECT 
        "all_ip"."IP5",
        SUM(
  CASE WHEN CAST('${day}' AS INT) > 1 THEN COALESCE("pt"."Day1", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 2 THEN COALESCE("pt"."Day2", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 3 THEN COALESCE("pt"."Day3", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 4 THEN COALESCE("pt"."Day4", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 5 THEN COALESCE("pt"."Day5", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 6 THEN COALESCE("pt"."Day6", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 7 THEN COALESCE("pt"."Day7", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 8 THEN COALESCE("pt"."Day8", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 9 THEN COALESCE("pt"."Day9", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 10 THEN COALESCE("pt"."Day10", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 11 THEN COALESCE("pt"."Day11", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 12 THEN COALESCE("pt"."Day12", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 13 THEN COALESCE("pt"."Day13", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 14 THEN COALESCE("pt"."Day14", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 15 THEN COALESCE("pt"."Day15", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 16 THEN COALESCE("pt"."Day16", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 17 THEN COALESCE("pt"."Day17", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 18 THEN COALESCE("pt"."Day18", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 19 THEN COALESCE("pt"."Day19", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 20 THEN COALESCE("pt"."Day20", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 21 THEN COALESCE("pt"."Day21", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 22 THEN COALESCE("pt"."Day22", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 23 THEN COALESCE("pt"."Day23", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 24 THEN COALESCE("pt"."Day24", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 25 THEN COALESCE("pt"."Day25", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 26 THEN COALESCE("pt"."Day26", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 27 THEN COALESCE("pt"."Day27", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 28 THEN COALESCE("pt"."Day28", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 29 THEN COALESCE("pt"."Day29", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 30 THEN COALESCE("pt"."Day30", 0) ELSE 0 END +
  (CASE CAST('${day}' AS INT)
    WHEN 1 THEN COALESCE("pt"."Day1", 0) WHEN 2 THEN COALESCE("pt"."Day2", 0) WHEN 3 THEN COALESCE("pt"."Day3", 0) WHEN 4 THEN COALESCE("pt"."Day4", 0) WHEN 5 THEN COALESCE("pt"."Day5", 0)
    WHEN 6 THEN COALESCE("pt"."Day6", 0) WHEN 7 THEN COALESCE("pt"."Day7", 0) WHEN 8 THEN COALESCE("pt"."Day8", 0) WHEN 9 THEN COALESCE("pt"."Day9", 0) WHEN 10 THEN COALESCE("pt"."Day10", 0)
    WHEN 11 THEN COALESCE("pt"."Day11", 0) WHEN 12 THEN COALESCE("pt"."Day12", 0) WHEN 13 THEN COALESCE("pt"."Day13", 0) WHEN 14 THEN COALESCE("pt"."Day14", 0) WHEN 15 THEN COALESCE("pt"."Day15", 0)
    WHEN 16 THEN COALESCE("pt"."Day16", 0) WHEN 17 THEN COALESCE("pt"."Day17", 0) WHEN 18 THEN COALESCE("pt"."Day18", 0) WHEN 19 THEN COALESCE("pt"."Day19", 0) WHEN 20 THEN COALESCE("pt"."Day20", 0)
    WHEN 21 THEN COALESCE("pt"."Day21", 0) WHEN 22 THEN COALESCE("pt"."Day22", 0) WHEN 23 THEN COALESCE("pt"."Day23", 0) WHEN 24 THEN COALESCE("pt"."Day24", 0) WHEN 25 THEN COALESCE("pt"."Day25", 0)
    WHEN 26 THEN COALESCE("pt"."Day26", 0) WHEN 27 THEN COALESCE("pt"."Day27", 0) WHEN 28 THEN COALESCE("pt"."Day28", 0) WHEN 29 THEN COALESCE("pt"."Day29", 0) WHEN 30 THEN COALESCE("pt"."Day30", 0)
    WHEN 31 THEN COALESCE("pt"."Day31", 0)
    ELSE 0
  END) * (
    CASE 
      WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN (1.0 / 3.0)
      WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN (2.0 / 3.0)
      ELSE 1.0
    END
  )
) AS "plan_qty",
        SUM(
          COALESCE("pt"."Day1", 0) + COALESCE("pt"."Day2", 0) + COALESCE("pt"."Day3", 0) + COALESCE("pt"."Day4", 0) + COALESCE("pt"."Day5", 0) +
          COALESCE("pt"."Day6", 0) + COALESCE("pt"."Day7", 0) + COALESCE("pt"."Day8", 0) + COALESCE("pt"."Day9", 0) + COALESCE("pt"."Day10", 0) +
          COALESCE("pt"."Day11", 0) + COALESCE("pt"."Day12", 0) + COALESCE("pt"."Day13", 0) + COALESCE("pt"."Day14", 0) + COALESCE("pt"."Day15", 0) +
          COALESCE("pt"."Day16", 0) + COALESCE("pt"."Day17", 0) + COALESCE("pt"."Day18", 0) + COALESCE("pt"."Day19", 0) + COALESCE("pt"."Day20", 0) +
          COALESCE("pt"."Day21", 0) + COALESCE("pt"."Day22", 0) + COALESCE("pt"."Day23", 0) + COALESCE("pt"."Day24", 0) + COALESCE("pt"."Day25", 0) +
          COALESCE("pt"."Day26", 0) + COALESCE("pt"."Day27", 0) + COALESCE("pt"."Day28", 0) + COALESCE("pt"."Day29", 0) + COALESCE("pt"."Day30", 0) + COALESCE("pt"."Day31", 0)
        ) AS "total_month_plan"
    FROM (
        SELECT DISTINCT SUBSTRING(CAST(CAST("IP_code" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData"
        WHERE "month" = CAST('${month}' AS INT) AND "IP_code" IS NOT NULL
        UNION
        SELECT DISTINCT SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
        JOIN (
            SELECT TRC_BARCODE AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
            UNION ALL
            SELECT TRC_ID AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
        ) T ON D.DDC_BARCODE = T.BC
        JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
        WHERE D.DDC_BARCODE IS NOT NULL AND D.DDC_BARCODE NOT IN ('-', '0')
          AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
          AND D.DDC_START_CYCLE < (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP) + INTERVAL '1' MONTH)
          AND M2.MAT_IP_CODE IS NOT NULL
    ) "all_ip"
    LEFT JOIN "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData" "pt"
        ON "all_ip"."IP5" = CAST("pt"."IP5" AS VARCHAR)
       AND "pt"."month" = CAST('${month}' AS INT)
    GROUP BY "all_ip"."IP5"
) "p"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        'TRUE' AS "in_curing"
    FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_PLAN" S
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
        ON S.MAT_SAP_CODE = M2.MAT_SAP_CODE
    WHERE S.PP_CODE = 'CU1'
      AND M2.MAT_IP_CODE IS NOT NULL
      AND S.MPN_START_DATETIME >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
      AND S.MPN_START_DATETIME <  (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP) + INTERVAL '1' DAY)
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "sch" ON "p"."IP5" = "sch"."IP5"
LEFT JOIN (
    SELECT 
        "all_c"."IP5",
        SUM("all_c"."qty") AS cured_qty
    FROM (
SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT D.DDC_BARCODE) AS qty
    FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
    JOIN (
        SELECT TRC_BARCODE AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
        UNION ALL
        SELECT TRC_ID AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
    ) T ON D.DDC_BARCODE = T.BC
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
    WHERE D.DDC_BARCODE IS NOT NULL AND D.DDC_BARCODE NOT IN ('-', '0')
      AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND D.DDC_START_CYCLE < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
        UNION ALL

        SELECT 
            "adj"."IP5",
            "adj"."adj_qty" AS qty
        FROM (
            VALUES 
            ('60476', 8),
            ('31037', 6),
            ('37528', 6),
            ('23914', 5),
            ('38648', 5),
            ('60704', 5),
            ('36205', 4),
            ('37490', 4),
            ('37537', 4),
            ('39370', 4),
            ('60331', 4),
            ('19132', 3),
            ('38647', 3),
            ('60042', 3),
            ('61099', 3),
            ('31010', 2),
            ('32659', 2),
            ('35352', 2),
            ('36091', 2),
            ('36204', 2),
            ('36550', 2),
            ('36592', 2),
            ('37449', 2),
            ('37516', 2),
            ('37523', 2),
            ('37524', 2),
            ('37526', 2),
            ('38372', 2),
            ('60099', 2),
            ('60415', 2),
            ('60328', 2),
            ('60346', 2),
            ('60536', 2),
            ('60636', 2),
            ('61285', 2),
            ('61332', 2),
            ('61316', 2),
            ('36433', 1),
            ('36435', 1),
            ('36549', 1),
            ('37489', 1),
            ('37802', 1),
            ('38922', 1),
            ('38934', 1),
            ('39964', 1),
            ('41169', 1),
            ('60329', 1),
            ('60412', 1),
            ('60413', 1),
            ('60519', 1),
            ('60502', 1),
            ('60503', 1),
            ('61280', 1),
            ('61326', 1),
            ('61333', 1),
            ('61329', 1),
            ('60872', 1),
            ('60874', 1),
            ('61159', 1),
            ('61161', 1),
            ('61162', 1),
            ('61163', 1)
        ) AS "adj"("IP5", "adj_qty")
        WHERE CAST('${year}' AS INT) = 2026 AND CAST('${month}' AS INT) = 9 AND (
            CAST('${day}' AS INT) > 7 
            OR (CAST('${day}' AS INT) = 7 AND '${shift}' NOT IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)'))
        )
    ) "all_c"
    GROUP BY "all_c"."IP5"
) "c" ON "p"."IP5" = "c"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        SUM("QuantityTire") AS "delivered_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "ProductionDate" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND "ProductionDate" < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "d" ON "p"."IP5" = "d"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT "F2"."FDD_BARCODE") AS "scrap_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."FIN_DEFECTS_DECLARED" "F2"
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON "F2"."MAT_SAP_CODE" = M2."MAT_SAP_CODE"
    WHERE "F2"."FDD_ACTIVE" = 'T' AND "F2"."FDS_SEVERITY" = 'SC' AND CAST("F2"."CLA_CODE" AS VARCHAR) = '00'
      AND "F2"."FDD_TIME_STAMP" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND "F2"."FDD_TIME_STAMP" < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + INTERVAL '1' DAY
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "s" ON "p"."IP5" = "s"."IP5"
WHERE (COALESCE("p"."total_month_plan", 0) > 0 OR COALESCE("c"."cured_qty", 0) > 0)
```

#### Panel: 🧠 Operational Action Needed — Priority IP Codes & Insights (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
    "p"."IP5" AS "IP Code",
    COALESCE("M"."MAT_CODE", "p"."IP5") AS "Short Code",
    COALESCE("p"."description", "i"."DESC", '-') AS "Description",
    CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) AS "Plan",
    COALESCE("c"."cured_qty", 0) AS "Curing",
    COALESCE("d"."delivered_qty", 0) AS "Delivery",
    GREATEST(0, (COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - COALESCE("d"."delivered_qty", 0)) AS "Inspection Queue",
    CASE 
        WHEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) > 0 
        THEN ROUND((CAST(LEAST(CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT), GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0))) AS DOUBLE) / CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) * 100.0, 1)
        ELSE 0 
    END AS "Curing CI Num",
    CASE 
        WHEN COALESCE("d"."delivered_qty", 0) >= CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AND CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) > 0 THEN 'STOP'
        WHEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) > 0 AND (CAST(GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) AS DOUBLE) / CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) < 0.85 THEN 'DEFICIT'
        WHEN ((COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - COALESCE("d"."delivered_qty", 0)) > 200 THEN 'QUEUE_WARN'
        ELSE 'NORMAL'
    END AS "Alert Type"
FROM (
    SELECT 
        "all_ip"."IP5",
        MAX("pt"."Description") AS "description",
        SUM(
          COALESCE("pt"."Day1", 0) + COALESCE("pt"."Day2", 0) + COALESCE("pt"."Day3", 0) + COALESCE("pt"."Day4", 0) + COALESCE("pt"."Day5", 0) +
          COALESCE("pt"."Day6", 0) + COALESCE("pt"."Day7", 0) + COALESCE("pt"."Day8", 0) + COALESCE("pt"."Day9", 0) + COALESCE("pt"."Day10", 0) +
          COALESCE("pt"."Day11", 0) + COALESCE("pt"."Day12", 0) + COALESCE("pt"."Day13", 0) + COALESCE("pt"."Day14", 0) + COALESCE("pt"."Day15", 0) +
          COALESCE("pt"."Day16", 0) + COALESCE("pt"."Day17", 0) + COALESCE("pt"."Day18", 0) + COALESCE("pt"."Day19", 0) + COALESCE("pt"."Day20", 0) +
          COALESCE("pt"."Day21", 0) + COALESCE("pt"."Day22", 0) + COALESCE("pt"."Day23", 0) + COALESCE("pt"."Day24", 0) + COALESCE("pt"."Day25", 0) +
          COALESCE("pt"."Day26", 0) + COALESCE("pt"."Day27", 0) + COALESCE("pt"."Day28", 0) + COALESCE("pt"."Day29", 0) + COALESCE("pt"."Day30", 0) + COALESCE("pt"."Day31", 0)
        ) AS "total_month_plan",
        SUM(
          CASE WHEN CAST('${day}' AS INT) >= 1 THEN COALESCE("pt"."Day1", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 2 THEN COALESCE("pt"."Day2", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 3 THEN COALESCE("pt"."Day3", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 4 THEN COALESCE("pt"."Day4", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 5 THEN COALESCE("pt"."Day5", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 6 THEN COALESCE("pt"."Day6", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 7 THEN COALESCE("pt"."Day7", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 8 THEN COALESCE("pt"."Day8", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 9 THEN COALESCE("pt"."Day9", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 10 THEN COALESCE("pt"."Day10", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 11 THEN COALESCE("pt"."Day11", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 12 THEN COALESCE("pt"."Day12", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 13 THEN COALESCE("pt"."Day13", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 14 THEN COALESCE("pt"."Day14", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 15 THEN COALESCE("pt"."Day15", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 16 THEN COALESCE("pt"."Day16", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 17 THEN COALESCE("pt"."Day17", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 18 THEN COALESCE("pt"."Day18", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 19 THEN COALESCE("pt"."Day19", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 20 THEN COALESCE("pt"."Day20", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 21 THEN COALESCE("pt"."Day21", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 22 THEN COALESCE("pt"."Day22", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 23 THEN COALESCE("pt"."Day23", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 24 THEN COALESCE("pt"."Day24", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 25 THEN COALESCE("pt"."Day25", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 26 THEN COALESCE("pt"."Day26", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 27 THEN COALESCE("pt"."Day27", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 28 THEN COALESCE("pt"."Day28", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 29 THEN COALESCE("pt"."Day29", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 30 THEN COALESCE("pt"."Day30", 0) ELSE 0 END +
          CASE WHEN CAST('${day}' AS INT) >= 31 THEN COALESCE("pt"."Day31", 0) ELSE 0 END
        ) AS "plan_qty"
    FROM (
        SELECT DISTINCT SUBSTRING(CAST(CAST("IP_code" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData"
        WHERE "month" = CAST('${month}' AS INT) AND "IP_code" IS NOT NULL
        UNION
        SELECT DISTINCT SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
        JOIN (
            SELECT TRC_BARCODE AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
            UNION ALL
            SELECT TRC_ID AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
        ) T ON D.DDC_BARCODE = T.BC
        JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
        WHERE D.DDC_BARCODE IS NOT NULL AND D.DDC_BARCODE NOT IN ('-', '0')
          AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
          AND D.DDC_START_CYCLE < (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP) + INTERVAL '1' MONTH)
          AND M2.MAT_IP_CODE IS NOT NULL
    ) "all_ip"
    LEFT JOIN "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData" "pt"
        ON "all_ip"."IP5" = CAST("pt"."IP5" AS VARCHAR)
       AND "pt"."month" = CAST('${month}' AS INT)
    GROUP BY "all_ip"."IP5"
) "p"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        MIN(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR)) AS "IP_CODE",
        MAX("DESC") AS "DESC",
        MAX("TIER") AS "TIER",
        MAX("BRAND") AS "BRAND"
    FROM "EG_CA_TRU_FAC_PCS02"."INFO_TIER"
    WHERE "IP_CODE" IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR), 1, 5)
) "i" ON "p"."IP5" = "i"."IP5"
LEFT JOIN (
    SELECT "IP5", "MAT_CODE"
    FROM (
        SELECT 
            SUBSTRING(CAST(CAST("MAT_IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
            CAST("MAT_CODE" AS VARCHAR) AS "MAT_CODE",
            ROW_NUMBER() OVER (
                PARTITION BY SUBSTRING(CAST(CAST("MAT_IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) 
                ORDER BY "MAT_IMPORT_TIMESTAMP" DESC, "MAT_CODE" DESC
            ) AS rn
        FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
        WHERE "MAT_IP_CODE" IS NOT NULL AND "MAT_CODE" IS NOT NULL AND "MAT_CODE" <> ''
    ) m_ranked
    WHERE rn = 1
) "M" ON "p"."IP5" = "M"."IP5"
LEFT JOIN (
    SELECT 
        "all_c"."IP5",
        SUM("all_c"."qty") AS cured_qty
    FROM (
SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT D.DDC_BARCODE) AS qty
    FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
    JOIN (
        SELECT TRC_BARCODE AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
        UNION ALL
        SELECT TRC_ID AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
    ) T ON D.DDC_BARCODE = T.BC
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
    WHERE D.DDC_BARCODE IS NOT NULL AND D.DDC_BARCODE NOT IN ('-', '0')
      AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND D.DDC_START_CYCLE < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
        UNION ALL

        SELECT 
            "adj"."IP5",
            "adj"."adj_qty" AS qty
        FROM (
            VALUES 
            ('60476', 8),
            ('31037', 6),
            ('37528', 6),
            ('23914', 5),
            ('38648', 5),
            ('60704', 5),
            ('36205', 4),
            ('37490', 4),
            ('37537', 4),
            ('39370', 4),
            ('60331', 4),
            ('19132', 3),
            ('38647', 3),
            ('60042', 3),
            ('61099', 3),
            ('31010', 2),
            ('32659', 2),
            ('35352', 2),
            ('36091', 2),
            ('36204', 2),
            ('36550', 2),
            ('36592', 2),
            ('37449', 2),
            ('37516', 2),
            ('37523', 2),
            ('37524', 2),
            ('37526', 2),
            ('38372', 2),
            ('60099', 2),
            ('60415', 2),
            ('60328', 2),
            ('60346', 2),
            ('60536', 2),
            ('60636', 2),
            ('61285', 2),
            ('61332', 2),
            ('61316', 2),
            ('36433', 1),
            ('36435', 1),
            ('36549', 1),
            ('37489', 1),
            ('37802', 1),
            ('38922', 1),
            ('38934', 1),
            ('39964', 1),
            ('41169', 1),
            ('60329', 1),
            ('60412', 1),
            ('60413', 1),
            ('60519', 1),
            ('60502', 1),
            ('60503', 1),
            ('61280', 1),
            ('61326', 1),
            ('61333', 1),
            ('61329', 1),
            ('60872', 1),
            ('60874', 1),
            ('61159', 1),
            ('61161', 1),
            ('61162', 1),
            ('61163', 1)
        ) AS "adj"("IP5", "adj_qty")
        WHERE CAST('${year}' AS INT) = 2026 AND CAST('${month}' AS INT) = 9 AND (
            CAST('${day}' AS INT) > 7 
            OR (CAST('${day}' AS INT) = 7 AND '${shift}' NOT IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)'))
        )
    ) "all_c"
    GROUP BY "all_c"."IP5"
) "c" ON "p"."IP5" = "c"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        SUM("QuantityTire") AS "delivered_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "ProductionDate" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND "ProductionDate" < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "d" ON "p"."IP5" = "d"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT "F2"."FDD_BARCODE") AS "scrap_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."FIN_DEFECTS_DECLARED" "F2"
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON "F2"."MAT_SAP_CODE" = M2."MAT_SAP_CODE"
    WHERE "F2"."FDD_ACTIVE" = 'T' AND "F2"."FDS_SEVERITY" = 'SC' AND CAST("F2"."CLA_CODE" AS VARCHAR) = '00'
      AND "F2"."FDD_TIME_STAMP" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND "F2"."FDD_TIME_STAMP" < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + INTERVAL '1' DAY
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "s" ON "p"."IP5" = "s"."IP5"
WHERE (COALESCE("p"."total_month_plan", 0) > 0 OR COALESCE("c"."cured_qty", 0) > 0)
  AND (
    (COALESCE("d"."delivered_qty", 0) >= CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AND CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) > 0)
    OR (CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) > 0 AND (CAST(GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) AS DOUBLE) / CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) < 0.85)
    OR ((COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - COALESCE("d"."delivered_qty", 0)) > 200
  )
ORDER BY 
  CASE 
    WHEN (CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) > 0 AND (CAST(GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) AS DOUBLE) / CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) < 0.85) THEN 1
    WHEN ((COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - COALESCE("d"."delivered_qty", 0)) > 200 THEN 2
    ELSE 3
  END ASC,
  COALESCE("c"."cured_qty", 0) DESC
LIMIT 8;
```

#### Panel: Daily Mix - MTD Performance &Monitor (Month ${month} / Day ${day} | ${shift}) (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
    COALESCE("p"."green_cover", '-') AS "Green Cover",
    "p"."IP5" AS "IP Code",
    COALESCE("M"."MAT_CODE", "p"."IP5") AS "Short Code",
    COALESCE("p"."description",'-') AS "Description",
    COALESCE(NULLIF(NULLIF("i"."SIZE_SUB_FAMILY", ''), '-'), "sz"."Size", '-') AS "Size",
    COALESCE(NULLIF("p"."uniformity", '0'), '-') AS "Uniformity",
    CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AS "Month Plan",
    CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) AS "Accumulated Target Plan",
    COALESCE("c"."cured_qty", 0) AS "Cumulative Curing",
    (COALESCE("c"."cured_qty", 0) - CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) AS "Δ Curing",
    CASE 
        WHEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) > 0 
        THEN ROUND((CAST(LEAST(CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT), GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0))) AS DOUBLE) / CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) * 100.0, 1) || '%'
        ELSE '-' 
    END AS "Curing CI",
    COALESCE("s"."scrap_qty", 0) AS "Cumulative Scrap",
    COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0) AS "Cumulative Net Cured",
    COALESCE("d"."delivered_qty", 0) AS "Cumulative Delivery",
    (COALESCE("d"."delivered_qty", 0) - CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) AS "Δ Delivery",
    CASE 
        WHEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) > 0 
        THEN ROUND((CAST(LEAST(CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT), COALESCE("d"."delivered_qty", 0)) AS DOUBLE) / CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT)) * 100.0, 1) || '%'
        ELSE '-' 
    END AS "Delivery CI",
    GREATEST(0, (COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - COALESCE("d"."delivered_qty", 0)) AS "Inspection Queue",
    CASE WHEN COALESCE("d"."delivered_qty", 0) >= CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AND CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) > 0 THEN 'STOP' ELSE 'PRODUCE' END AS "Delivery Alert",
    COALESCE("sch"."in_curing", 'FALSE') AS "In Curing"
FROM (
    SELECT 
        "all_ip"."IP5",
        MAX("pt"."green_cover") AS "green_cover",
        MAX("pt"."Description") AS "description",
        MAX("pt"."Uniformity") AS "uniformity",
        SUM(
          COALESCE("pt"."Day1", 0) + COALESCE("pt"."Day2", 0) + COALESCE("pt"."Day3", 0) + COALESCE("pt"."Day4", 0) + COALESCE("pt"."Day5", 0) +
          COALESCE("pt"."Day6", 0) + COALESCE("pt"."Day7", 0) + COALESCE("pt"."Day8", 0) + COALESCE("pt"."Day9", 0) + COALESCE("pt"."Day10", 0) +
          COALESCE("pt"."Day11", 0) + COALESCE("pt"."Day12", 0) + COALESCE("pt"."Day13", 0) + COALESCE("pt"."Day14", 0) + COALESCE("pt"."Day15", 0) +
          COALESCE("pt"."Day16", 0) + COALESCE("pt"."Day17", 0) + COALESCE("pt"."Day18", 0) + COALESCE("pt"."Day19", 0) + COALESCE("pt"."Day20", 0) +
          COALESCE("pt"."Day21", 0) + COALESCE("pt"."Day22", 0) + COALESCE("pt"."Day23", 0) + COALESCE("pt"."Day24", 0) + COALESCE("pt"."Day25", 0) +
          COALESCE("pt"."Day26", 0) + COALESCE("pt"."Day27", 0) + COALESCE("pt"."Day28", 0) + COALESCE("pt"."Day29", 0) + COALESCE("pt"."Day30", 0) + COALESCE("pt"."Day31", 0)
        ) AS "total_month_plan",
        SUM(
  CASE WHEN CAST('${day}' AS INT) > 1 THEN COALESCE("pt"."Day1", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 2 THEN COALESCE("pt"."Day2", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 3 THEN COALESCE("pt"."Day3", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 4 THEN COALESCE("pt"."Day4", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 5 THEN COALESCE("pt"."Day5", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 6 THEN COALESCE("pt"."Day6", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 7 THEN COALESCE("pt"."Day7", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 8 THEN COALESCE("pt"."Day8", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 9 THEN COALESCE("pt"."Day9", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 10 THEN COALESCE("pt"."Day10", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 11 THEN COALESCE("pt"."Day11", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 12 THEN COALESCE("pt"."Day12", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 13 THEN COALESCE("pt"."Day13", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 14 THEN COALESCE("pt"."Day14", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 15 THEN COALESCE("pt"."Day15", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 16 THEN COALESCE("pt"."Day16", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 17 THEN COALESCE("pt"."Day17", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 18 THEN COALESCE("pt"."Day18", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 19 THEN COALESCE("pt"."Day19", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 20 THEN COALESCE("pt"."Day20", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 21 THEN COALESCE("pt"."Day21", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 22 THEN COALESCE("pt"."Day22", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 23 THEN COALESCE("pt"."Day23", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 24 THEN COALESCE("pt"."Day24", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 25 THEN COALESCE("pt"."Day25", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 26 THEN COALESCE("pt"."Day26", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 27 THEN COALESCE("pt"."Day27", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 28 THEN COALESCE("pt"."Day28", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 29 THEN COALESCE("pt"."Day29", 0) ELSE 0 END +
  CASE WHEN CAST('${day}' AS INT) > 30 THEN COALESCE("pt"."Day30", 0) ELSE 0 END +
  (CASE CAST('${day}' AS INT)
    WHEN 1 THEN COALESCE("pt"."Day1", 0) WHEN 2 THEN COALESCE("pt"."Day2", 0) WHEN 3 THEN COALESCE("pt"."Day3", 0) WHEN 4 THEN COALESCE("pt"."Day4", 0) WHEN 5 THEN COALESCE("pt"."Day5", 0)
    WHEN 6 THEN COALESCE("pt"."Day6", 0) WHEN 7 THEN COALESCE("pt"."Day7", 0) WHEN 8 THEN COALESCE("pt"."Day8", 0) WHEN 9 THEN COALESCE("pt"."Day9", 0) WHEN 10 THEN COALESCE("pt"."Day10", 0)
    WHEN 11 THEN COALESCE("pt"."Day11", 0) WHEN 12 THEN COALESCE("pt"."Day12", 0) WHEN 13 THEN COALESCE("pt"."Day13", 0) WHEN 14 THEN COALESCE("pt"."Day14", 0) WHEN 15 THEN COALESCE("pt"."Day15", 0)
    WHEN 16 THEN COALESCE("pt"."Day16", 0) WHEN 17 THEN COALESCE("pt"."Day17", 0) WHEN 18 THEN COALESCE("pt"."Day18", 0) WHEN 19 THEN COALESCE("pt"."Day19", 0) WHEN 20 THEN COALESCE("pt"."Day20", 0)
    WHEN 21 THEN COALESCE("pt"."Day21", 0) WHEN 22 THEN COALESCE("pt"."Day22", 0) WHEN 23 THEN COALESCE("pt"."Day23", 0) WHEN 24 THEN COALESCE("pt"."Day24", 0) WHEN 25 THEN COALESCE("pt"."Day25", 0)
    WHEN 26 THEN COALESCE("pt"."Day26", 0) WHEN 27 THEN COALESCE("pt"."Day27", 0) WHEN 28 THEN COALESCE("pt"."Day28", 0) WHEN 29 THEN COALESCE("pt"."Day29", 0) WHEN 30 THEN COALESCE("pt"."Day30", 0)
    WHEN 31 THEN COALESCE("pt"."Day31", 0)
    ELSE 0
  END) * (
    CASE 
      WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN (1.0 / 3.0)
      WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN (2.0 / 3.0)
      ELSE 1.0
    END
  )
) AS "plan_qty"
    FROM (
        SELECT DISTINCT SUBSTRING(CAST(CAST("IP_code" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData"
        WHERE "month" = CAST('${month}' AS INT) AND "IP_code" IS NOT NULL
        UNION
        SELECT DISTINCT SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
        JOIN (
            SELECT TRC_BARCODE AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
            UNION ALL
            SELECT TRC_ID AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
        ) T ON D.DDC_BARCODE = T.BC
        JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
        WHERE D.DDC_BARCODE IS NOT NULL AND D.DDC_BARCODE NOT IN ('-', '0')
          AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
          AND D.DDC_START_CYCLE < (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP) + INTERVAL '1' MONTH)
          AND M2.MAT_IP_CODE IS NOT NULL
    ) "all_ip"
    LEFT JOIN "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData" "pt"
        ON "all_ip"."IP5" = CAST("pt"."IP5" AS VARCHAR)
       AND "pt"."month" = CAST('${month}' AS INT)
    GROUP BY "all_ip"."IP5"
) "p"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        MIN(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR)) AS "IP_CODE",
        MAX("DESC") AS "DESC",
        MAX("TIER") AS "TIER",
        MAX("BRAND") AS "BRAND",
        MAX("SIZE_SUB_FAMILY") AS "SIZE_SUB_FAMILY"
    FROM "EG_CA_TRU_FAC_PCS02"."INFO_TIER"
    WHERE "IP_CODE" IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR), 1, 5)
) "i" ON "p"."IP5" = "i"."IP5"

LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        MAX("Size") AS "Size"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "Size" IS NOT NULL AND "Size" <> ''
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "sz" ON "p"."IP5" = "sz"."IP5"
LEFT JOIN (
    SELECT "IP5", "MAT_CODE"
    FROM (
        SELECT 
            SUBSTRING(CAST(CAST("MAT_IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
            CAST("MAT_CODE" AS VARCHAR) AS "MAT_CODE",
            ROW_NUMBER() OVER (
                PARTITION BY SUBSTRING(CAST(CAST("MAT_IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) 
                ORDER BY "MAT_IMPORT_TIMESTAMP" DESC, "MAT_CODE" DESC
            ) AS rn
        FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
        WHERE "MAT_IP_CODE" IS NOT NULL AND "MAT_CODE" IS NOT NULL AND "MAT_CODE" <> ''
    ) m_ranked
    WHERE rn = 1
) "M" ON "p"."IP5" = "M"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        'TRUE' AS "in_curing"
    FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_PLAN" S
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
        ON S.MAT_SAP_CODE = M2.MAT_SAP_CODE
    WHERE S.PP_CODE = 'CU1'
      AND M2.MAT_IP_CODE IS NOT NULL
      AND S.MPN_START_DATETIME >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
      AND S.MPN_START_DATETIME <  (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP) + INTERVAL '1' DAY)
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "sch" ON "p"."IP5" = "sch"."IP5"
LEFT JOIN (
    SELECT 
        "all_c"."IP5",
        SUM("all_c"."qty") AS cured_qty
    FROM (
SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT D.DDC_BARCODE) AS qty
    FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
    JOIN (
        SELECT TRC_BARCODE AS BC, MAT_SAP_CODE
        FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS"
        WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
        UNION ALL
        SELECT TRC_ID AS BC, MAT_SAP_CODE
        FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS"
        WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
    ) T ON D.DDC_BARCODE = T.BC
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
        ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
    WHERE D.DDC_BARCODE IS NOT NULL
      AND D.DDC_BARCODE NOT IN ('-', '0')
      AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND D.DDC_START_CYCLE < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
        UNION ALL

        SELECT 
            "adj"."IP5",
            "adj"."adj_qty" AS qty
        FROM (
            VALUES 
            ('60476', 8),
            ('31037', 6),
            ('37528', 6),
            ('23914', 5),
            ('38648', 5),
            ('60704', 5),
            ('36205', 4),
            ('37490', 4),
            ('37537', 4),
            ('39370', 4),
            ('60331', 4),
            ('19132', 3),
            ('38647', 3),
            ('60042', 3),
            ('61099', 3),
            ('31010', 2),
            ('32659', 2),
            ('35352', 2),
            ('36091', 2),
            ('36204', 2),
            ('36550', 2),
            ('36592', 2),
            ('37449', 2),
            ('37516', 2),
            ('37523', 2),
            ('37524', 2),
            ('37526', 2),
            ('38372', 2),
            ('60099', 2),
            ('60415', 2),
            ('60328', 2),
            ('60346', 2),
            ('60536', 2),
            ('60636', 2),
            ('61285', 2),
            ('61332', 2),
            ('61316', 2),
            ('36433', 1),
            ('36435', 1),
            ('36549', 1),
            ('37489', 1),
            ('37802', 1),
            ('38922', 1),
            ('38934', 1),
            ('39964', 1),
            ('41169', 1),
            ('60329', 1),
            ('60412', 1),
            ('60413', 1),
            ('60519', 1),
            ('60502', 1),
            ('60503', 1),
            ('61280', 1),
            ('61326', 1),
            ('61333', 1),
            ('61329', 1),
            ('60872', 1),
            ('60874', 1),
            ('61159', 1),
            ('61161', 1),
            ('61162', 1),
            ('61163', 1)
        ) AS "adj"("IP5", "adj_qty")
        WHERE CAST('${year}' AS INT) = 2026 AND CAST('${month}' AS INT) = 9 AND (
            CAST('${day}' AS INT) > 7 
            OR (CAST('${day}' AS INT) = 7 AND '${shift}' NOT IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)'))
        )
    ) "all_c"
    GROUP BY "all_c"."IP5"
) "c" ON "p"."IP5" = "c"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        SUM("QuantityTire") AS "delivered_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "ProductionDate" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND "ProductionDate" < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "d" ON "p"."IP5" = "d"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT "F2"."FDD_BARCODE") AS "scrap_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."FIN_DEFECTS_DECLARED" "F2"
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
        ON "F2"."MAT_SAP_CODE" = M2."MAT_SAP_CODE"
    WHERE "F2"."FDD_ACTIVE" = 'T'
      AND "F2"."FDS_SEVERITY" = 'SC'
      AND CAST("F2"."CLA_CODE" AS VARCHAR) = '00'
      AND "F2"."FDD_TIME_STAMP" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP)
      AND "F2"."FDD_TIME_STAMP" < 
          CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          + INTERVAL '1' DAY
          + CASE 
              WHEN '${shift}' IN ('1', 'Shift 1', 'Shift 1 (00:00 - 08:00)') THEN INTERVAL '8' HOUR
              WHEN '${shift}' IN ('2', 'Shift 2', 'Shift 2 (08:00 - 16:00)') THEN INTERVAL '16' HOUR
              ELSE INTERVAL '1' DAY
            END
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "s" ON "p"."IP5" = "s"."IP5"
WHERE (COALESCE("p"."total_month_plan", 0) > 0 OR COALESCE("c"."cured_qty", 0) > 0)
  AND ('${shortcode:csv}' = 'All' OR 'All' IN (${shortcode:singlequote}) OR COALESCE("M"."MAT_CODE", "p"."IP5") IN (${shortcode:singlequote}))
ORDER BY "Green Cover" asc
```

#### Panel: Daily Mix - Single-Day Shift Performance Monitor (Day ${day} | ${shift}) (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
    COALESCE("p"."green_cover", '-') AS "Green Cover",
    "p"."IP5" AS "IP Code",
    COALESCE("M"."MAT_CODE", "p"."IP5") AS "Short Code",
    COALESCE("p"."description", '-') AS "Description",
    COALESCE(NULLIF(NULLIF("i"."SIZE_SUB_FAMILY", ''), '-'), "sz"."Size", '-') AS "Size",
    COALESCE("pat"."Pattern", '-') AS "Tread",
    COALESCE(NULLIF("p"."uniformity", '0'), '-') AS "Uniformity",
    ROUND(COALESCE("p"."total_month_plan", 0)) AS "Month Plan",
    CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) AS "day_plan",
    CAST(ROUND(COALESCE("d"."delivered_qty", 0)) AS INT) AS "day_del",
    CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AS "month_plan",
    COALESCE("c"."cured_s1", 0) AS "cured_s1",
    COALESCE("c"."cured_s2", 0) AS "cured_s2",
    COALESCE("c"."cured_s3", 0) AS "cured_s3",
    COALESCE("s"."scrap_s1", 0) AS "scrap_s1",
    COALESCE("s"."scrap_s2", 0) AS "scrap_s2",
    COALESCE("s"."scrap_s3", 0) AS "scrap_s3",
    CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END AS "Shift Target",
    COALESCE("c"."cured_qty", 0) AS "Shift Curing",
    COALESCE("c"."cured_qty", 0) - (CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END) AS "Δ Shift Curing",
    CASE 
        WHEN (CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END) > 0 
        THEN CONCAT(CAST(ROUND(LEAST(1.0, CAST(GREATEST(0, COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) AS DOUBLE) / (CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END)) * 100.0, 1) AS VARCHAR), '%')
        ELSE '-' 
    END AS "Shift Curing CI",
    COALESCE("s"."scrap_qty", 0) AS "Shift Scrap",
    COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0) AS "Shift Net Cured",
    (CASE WHEN '${shift}' = 'All' THEN COALESCE("d"."delivered_qty", 0) ELSE CAST(ROUND(COALESCE("d"."delivered_qty", 0) / 3.0) AS INT) END) AS "Shift Delivery",
    (CASE WHEN '${shift}' = 'All' THEN COALESCE("d"."delivered_qty", 0) ELSE CAST(ROUND(COALESCE("d"."delivered_qty", 0) / 3.0) AS INT) END) - (CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END) AS "Δ Shift Delivery",
    CASE 
        WHEN (CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END) > 0 
        THEN CONCAT(CAST(ROUND(LEAST(1.0, CAST((CASE WHEN '${shift}' = 'All' THEN COALESCE("d"."delivered_qty", 0) ELSE CAST(ROUND(COALESCE("d"."delivered_qty", 0) / 3.0) AS INT) END) AS DOUBLE) / (CASE WHEN '${shift}' = 'All' THEN CAST(ROUND(COALESCE("p"."plan_qty", 0)) AS INT) ELSE CAST(ROUND(COALESCE("p"."plan_qty", 0) / 3.0) AS INT) END)) * 100.0, 1) AS VARCHAR), '%')
        ELSE '-' 
    END AS "Shift Delivery CI",
    GREATEST(0, (COALESCE("c"."cured_qty", 0) - COALESCE("s"."scrap_qty", 0)) - (CASE WHEN '${shift}' = 'All' THEN COALESCE("d"."delivered_qty", 0) ELSE CAST(ROUND(COALESCE("d"."delivered_qty", 0) / 3.0) AS INT) END)) AS "Inspection Queue",
    CASE WHEN COALESCE("d"."delivered_qty", 0) >= CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) AND CAST(ROUND(COALESCE("p"."total_month_plan", 0)) AS INT) > 0 THEN 'STOP' ELSE 'PRODUCE' END AS "Delivery Alert",
    COALESCE("sch"."in_curing", 'FALSE') AS "In Curing"
FROM (
    SELECT 
        "all_ip"."IP5",
        MAX("pt"."green_cover") AS "green_cover",
        MAX("pt"."Description") AS "description",
        MAX("pt"."Uniformity") AS "uniformity",
        SUM(
          COALESCE("pt"."Day1", 0) + COALESCE("pt"."Day2", 0) + COALESCE("pt"."Day3", 0) + COALESCE("pt"."Day4", 0) + COALESCE("pt"."Day5", 0) +
          COALESCE("pt"."Day6", 0) + COALESCE("pt"."Day7", 0) + COALESCE("pt"."Day8", 0) + COALESCE("pt"."Day9", 0) + COALESCE("pt"."Day10", 0) +
          COALESCE("pt"."Day11", 0) + COALESCE("pt"."Day12", 0) + COALESCE("pt"."Day13", 0) + COALESCE("pt"."Day14", 0) + COALESCE("pt"."Day15", 0) +
          COALESCE("pt"."Day16", 0) + COALESCE("pt"."Day17", 0) + COALESCE("pt"."Day18", 0) + COALESCE("pt"."Day19", 0) + COALESCE("pt"."Day20", 0) +
          COALESCE("pt"."Day21", 0) + COALESCE("pt"."Day22", 0) + COALESCE("pt"."Day23", 0) + COALESCE("pt"."Day24", 0) + COALESCE("pt"."Day25", 0) +
          COALESCE("pt"."Day26", 0) + COALESCE("pt"."Day27", 0) + COALESCE("pt"."Day28", 0) + COALESCE("pt"."Day29", 0) + COALESCE("pt"."Day30", 0) + COALESCE("pt"."Day31", 0)
        ) AS "total_month_plan",
        SUM(
          CASE CAST('${day}' AS INT)
            WHEN 1 THEN COALESCE("pt"."Day1", 0) WHEN 2 THEN COALESCE("pt"."Day2", 0) WHEN 3 THEN COALESCE("pt"."Day3", 0) WHEN 4 THEN COALESCE("pt"."Day4", 0) WHEN 5 THEN COALESCE("pt"."Day5", 0)
            WHEN 6 THEN COALESCE("pt"."Day6", 0) WHEN 7 THEN COALESCE("pt"."Day7", 0) WHEN 8 THEN COALESCE("pt"."Day8", 0) WHEN 9 THEN COALESCE("pt"."Day9", 0) WHEN 10 THEN COALESCE("pt"."Day10", 0)
            WHEN 11 THEN COALESCE("pt"."Day11", 0) WHEN 12 THEN COALESCE("pt"."Day12", 0) WHEN 13 THEN COALESCE("pt"."Day13", 0) WHEN 14 THEN COALESCE("pt"."Day14", 0) WHEN 15 THEN COALESCE("pt"."Day15", 0)
            WHEN 16 THEN COALESCE("pt"."Day16", 0) WHEN 17 THEN COALESCE("pt"."Day17", 0) WHEN 18 THEN COALESCE("pt"."Day18", 0) WHEN 19 THEN COALESCE("pt"."Day19", 0) WHEN 20 THEN COALESCE("pt"."Day20", 0)
            WHEN 21 THEN COALESCE("pt"."Day21", 0) WHEN 22 THEN COALESCE("pt"."Day22", 0) WHEN 23 THEN COALESCE("pt"."Day23", 0) WHEN 24 THEN COALESCE("pt"."Day24", 0) WHEN 25 THEN COALESCE("pt"."Day25", 0)
            WHEN 26 THEN COALESCE("pt"."Day26", 0) WHEN 27 THEN COALESCE("pt"."Day27", 0) WHEN 28 THEN COALESCE("pt"."Day28", 0) WHEN 29 THEN COALESCE("pt"."Day29", 0) WHEN 30 THEN COALESCE("pt"."Day30", 0)
            WHEN 31 THEN COALESCE("pt"."Day31", 0)
            ELSE 0
          END
        ) AS "plan_qty"
    FROM (
        SELECT DISTINCT SUBSTRING(CAST(CAST("IP_code" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData"
        WHERE "month" = CAST('${month}' AS INT) AND "IP_code" IS NOT NULL
        UNION
        SELECT DISTINCT SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5"
        FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
        JOIN (
            SELECT TRC_BARCODE AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
            UNION ALL
            SELECT TRC_ID AS BC, MAT_SAP_CODE FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS" WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
        ) T ON D.DDC_BARCODE = T.BC
        JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2 ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
        WHERE D.DDC_BARCODE IS NOT NULL AND D.DDC_BARCODE NOT IN ('-', '0')
          AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          AND D.DDC_START_CYCLE <  (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP) + INTERVAL '1' DAY)
          AND M2.MAT_IP_CODE IS NOT NULL
    ) "all_ip"
    LEFT JOIN "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData" "pt"
        ON "all_ip"."IP5" = CAST("pt"."IP5" AS VARCHAR)
       AND "pt"."month" = CAST('${month}' AS INT)
    GROUP BY "all_ip"."IP5"
) "p"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        MIN(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR)) AS "IP_CODE",
        MAX("DESC") AS "DESC",
        MAX("TIER") AS "TIER",
        MAX("BRAND") AS "BRAND",
        MAX("SIZE_SUB_FAMILY") AS "SIZE_SUB_FAMILY"
    FROM "EG_CA_TRU_FAC_PCS02"."INFO_TIER"
    WHERE "IP_CODE" IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST("IP_CODE" AS BIGINT) AS VARCHAR), 1, 5)
) "i" ON "p"."IP5" = "i"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        MAX("Size") AS "Size"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "Size" IS NOT NULL AND "Size" <> ''
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "sz" ON "p"."IP5" = "sz"."IP5"
LEFT JOIN (
    SELECT "IP5", "MAT_CODE"
    FROM (
        SELECT 
            SUBSTRING(CAST(CAST("MAT_IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
            CAST("MAT_CODE" AS VARCHAR) AS "MAT_CODE",
            ROW_NUMBER() OVER (
                PARTITION BY SUBSTRING(CAST(CAST("MAT_IP_CODE" AS BIGINT) AS VARCHAR), 1, 5) 
                ORDER BY "MAT_IMPORT_TIMESTAMP" DESC, "MAT_CODE" DESC
            ) AS rn
        FROM "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS"
        WHERE "MAT_IP_CODE" IS NOT NULL AND "MAT_CODE" IS NOT NULL AND "MAT_CODE" <> ''
    ) m_ranked
    WHERE rn = 1
) "M" ON "p"."IP5" = "M"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        MAX("Pattern") AS "Pattern",
        MAX("Size") AS "Size"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "Pattern" IS NOT NULL AND "Pattern" <> ''
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "pat" ON "p"."IP5" = "pat"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        'TRUE' AS "in_curing"
    FROM "EG_CA_TRU_FAC_PCS02"."SCH_MACHINE_PLAN" S
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
        ON S.MAT_SAP_CODE = M2.MAT_SAP_CODE
    WHERE S.PP_CODE = 'CU1'
      AND M2.MAT_IP_CODE IS NOT NULL
      AND S.MPN_START_DATETIME >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
      AND S.MPN_START_DATETIME <  (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP) + INTERVAL '1' DAY)
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "sch" ON "p"."IP5" = "sch"."IP5"
LEFT JOIN (
    SELECT 
        "all_c"."IP5",
        SUM("all_c"."cured_s1") AS cured_s1,
        SUM("all_c"."cured_s2") AS cured_s2,
        SUM("all_c"."cured_s3") AS cured_s3,
        SUM("all_c"."cured_s1" + "all_c"."cured_s2" + "all_c"."cured_s3") AS cured_qty
    FROM (
        SELECT 
            SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
            COUNT(DISTINCT CASE WHEN EXTRACT(HOUR FROM D.DDC_START_CYCLE) >= 0 AND EXTRACT(HOUR FROM D.DDC_START_CYCLE) < 8 THEN D.DDC_BARCODE END) AS cured_s1,
            COUNT(DISTINCT CASE WHEN EXTRACT(HOUR FROM D.DDC_START_CYCLE) >= 8 AND EXTRACT(HOUR FROM D.DDC_START_CYCLE) < 16 THEN D.DDC_BARCODE END) AS cured_s2,
            COUNT(DISTINCT CASE WHEN EXTRACT(HOUR FROM D.DDC_START_CYCLE) >= 16 AND EXTRACT(HOUR FROM D.DDC_START_CYCLE) < 24 THEN D.DDC_BARCODE END) AS cured_s3
        FROM "EG_CA_TRU_CUR_CMA03"."DC_DYNAMIC_CURING_PROCESSED" D
        JOIN (
            SELECT TRC_BARCODE AS BC, MAT_SAP_CODE
            FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS"
            WHERE PP_CODE = 'CU1' AND TRC_BARCODE IS NOT NULL AND TRC_BARCODE NOT IN ('-', '0', '')
            UNION ALL
            SELECT TRC_ID AS BC, MAT_SAP_CODE
            FROM "EG_CA_TRU_FAC_PCS02"."TRC_BASIC_TABLE_WITH_HIS"
            WHERE PP_CODE = 'CU1' AND TRC_ID IS NOT NULL AND TRC_ID NOT IN ('-', '0', '') AND (TRC_BARCODE IS NULL OR TRC_ID <> TRC_BARCODE)
        ) T ON D.DDC_BARCODE = T.BC
        JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
            ON T.MAT_SAP_CODE = M2.MAT_SAP_CODE
        WHERE D.DDC_BARCODE IS NOT NULL
          AND D.DDC_BARCODE NOT IN ('-', '0')
          AND D.DDC_START_CYCLE >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
          AND D.DDC_START_CYCLE <  (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP) + INTERVAL '1' DAY)
          AND M2.MAT_IP_CODE IS NOT NULL
        GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)

        UNION ALL

        SELECT 
            "adj"."IP5",
            0 AS cured_s1,
            "adj"."adj_qty" AS cured_s2,
            0 AS cured_s3
        FROM (
            VALUES 
            ('60476', 8),
            ('31037', 6),
            ('37528', 6),
            ('23914', 5),
            ('38648', 5),
            ('60704', 5),
            ('36205', 4),
            ('37490', 4),
            ('37537', 4),
            ('39370', 4),
            ('60331', 4),
            ('19132', 3),
            ('38647', 3),
            ('60042', 3),
            ('61099', 3),
            ('31010', 2),
            ('32659', 2),
            ('35352', 2),
            ('36091', 2),
            ('36204', 2),
            ('36550', 2),
            ('36592', 2),
            ('37449', 2),
            ('37516', 2),
            ('37523', 2),
            ('37524', 2),
            ('37526', 2),
            ('38372', 2),
            ('60099', 2),
            ('60415', 2),
            ('60328', 2),
            ('60346', 2),
            ('60536', 2),
            ('60636', 2),
            ('61285', 2),
            ('61332', 2),
            ('61316', 2),
            ('36433', 1),
            ('36435', 1),
            ('36549', 1),
            ('37489', 1),
            ('37802', 1),
            ('38922', 1),
            ('38934', 1),
            ('39964', 1),
            ('41169', 1),
            ('60329', 1),
            ('60412', 1),
            ('60413', 1),
            ('60519', 1),
            ('60502', 1),
            ('60503', 1),
            ('61280', 1),
            ('61326', 1),
            ('61333', 1),
            ('61329', 1),
            ('60872', 1),
            ('60874', 1),
            ('61159', 1),
            ('61161', 1),
            ('61162', 1),
            ('61163', 1)
        ) AS "adj"("IP5", "adj_qty")
        WHERE CAST('${year}' AS INT) = 2026 AND CAST('${month}' AS INT) = 9 AND CAST('${day}' AS INT) = 7
    ) "all_c"
    GROUP BY "all_c"."IP5"
) "c" ON "p"."IP5" = "c"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        SUM("QuantityTire") AS "delivered_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA"
    WHERE "ProductionDate" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP)
      AND "ProductionDate" <  (CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-' || LPAD(CAST('${day}' AS VARCHAR), 2, '0') || ' 00:00:00' AS TIMESTAMP) + INTERVAL '1' DAY)
    GROUP BY SUBSTRING(CAST(CAST("IPCode" AS BIGINT) AS VARCHAR), 1, 5)
) "d" ON "p"."IP5" = "d"."IP5"
LEFT JOIN (
    SELECT 
        SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5) AS "IP5",
        COUNT(DISTINCT CASE WHEN CAST("F2"."FDD_SHF_CODE" AS VARCHAR) = '1' THEN "F2"."FDD_BARCODE" END) AS "scrap_s1",
        COUNT(DISTINCT CASE WHEN CAST("F2"."FDD_SHF_CODE" AS VARCHAR) = '2' THEN "F2"."FDD_BARCODE" END) AS "scrap_s2",
        COUNT(DISTINCT CASE WHEN CAST("F2"."FDD_SHF_CODE" AS VARCHAR) = '3' THEN "F2"."FDD_BARCODE" END) AS "scrap_s3",
        COUNT(DISTINCT "F2"."FDD_BARCODE") AS "scrap_qty"
    FROM "EG_CA_TRU_FAC_PCS02"."FIN_DEFECTS_DECLARED" "F2"
    JOIN "EG_CA_TRU_FAC_PCS02"."MD_MATERIALS" M2
        ON "F2"."MAT_SAP_CODE" = M2."MAT_SAP_CODE"
    WHERE "F2"."FDD_ACTIVE" = 'T'
      AND "F2"."FDS_SEVERITY" = 'SC'
      AND CAST("F2"."CLA_CODE" AS VARCHAR) = '00'
      AND "F2"."FDD_TIME_STAMP" >= CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP) + INTERVAL '${day}' DAY
      AND "F2"."FDD_TIME_STAMP" < CAST(CAST('${year}' AS VARCHAR) || '-' || LPAD(CAST('${month}' AS VARCHAR), 2, '0') || '-01 00:00:00' AS TIMESTAMP) + INTERVAL '${day}' DAY + INTERVAL '1' DAY
      AND M2.MAT_IP_CODE IS NOT NULL
    GROUP BY SUBSTRING(CAST(CAST(M2.MAT_IP_CODE AS BIGINT) AS VARCHAR), 1, 5)
) "s" ON "p"."IP5" = "s"."IP5"
WHERE (COALESCE("p"."total_month_plan", 0) > 0 OR COALESCE("c"."cured_qty", 0) > 0)
  AND ('${shortcode:csv}' = 'All' OR 'All' IN (${shortcode:singlequote}) OR COALESCE("M"."MAT_CODE", "p"."IP5") IN (${shortcode:singlequote}))
ORDER BY "Green Cover" asc
```

#### Panel: Panel Title (`table`)
```sql
SELECT 
    "IP_code" AS "IP Code",
    "IP5" AS "Short Code",
    "Description",
    "green_cover" AS "Green Cover",
    "month" AS "Month",
    "Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7", "Day8", "Day9", "Day10",
    "Day11", "Day12", "Day13", "Day14", "Day15", "Day16", "Day17", "Day18", "Day19", "Day20",
    "Day21", "Day22", "Day23", "Day24", "Day25", "Day26", "Day27", "Day28", "Day29", "Day30", "Day31"
FROM "EG_CA_TRU_FAC_LOC01"."TPL"."ProductionData"
ORDER BY "IP_code";
```

#### Panel: Panel Title (`table`)
```sql
SELECT *
FROM "EG_CA_TRU_FAC_PCS02"."Business"."GetIPCODEProductionYDA";
```

---

## Employee Relations KPIs (UID: `I8xvnYgvz`)
- **Category**: HR Analytics
- **Folder**: HR
- **Total Panels**: 1

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT
  max(CASE WHEN KPI = 'Employee Meals' AND Type = 'Actual' THEN "Value" END) AS Employee_Meals_cost,
  max(CASE WHEN KPI = 'Hotel Nights'AND Type = 'Actual' THEN "Value"  END) AS Hotel_Nights_cost,
  max(CASE WHEN KPI = 'Cars Maintenance' AND Type = 'Actual' THEN "Value" END) AS Cars_Maintenance_cost,
  max(CASE WHEN KPI = 'Flight Tickets' AND Type = 'Actual' THEN "Value"END) AS Flight_Tickets_cost,
  max(CASE WHEN KPI = 'Buffet/ Hospitalities' AND Type = 'Actual' THEN "Value"END) AS Buffet_cost,
  max(CASE WHEN KPI = 'Mobile Telephone expenses' AND Type = 'Actual' THEN "Value"END) AS Mobile_Telephone_expenses,
  max(CASE WHEN KPI = 'Trips / Entertainment' AND Type = 'Actual' THEN ROUND("Value",2) END) AS Trips_Entertainment  
FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
where TO_DATE("month", 'Month') = (
    SELECT MAX(TO_DATE("month", 'Month'))
    FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
    WHERE "year" = Year(Current_date())
    and Area = 'Employee Relations'
  );
```

---

## Legal KPIs (UID: `TiERG7zvz`)
- **Category**: HR Analytics
- **Folder**: HR
- **Total Panels**: 1

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT
  MAX(CASE WHEN KPI = 'Total Number of investigations'
           AND Type = 'Actual' THEN "Value" END) AS Total_Investigations,

  MAX(CASE WHEN KPI = 'Total Number Of contracts'
           AND Type = 'Actual' THEN "Value" END) AS Total_Contracts,

  MAX(CASE WHEN KPI = 'Won lawsuits cost avoidance'
           AND Type = 'Actual' THEN "Value" END) AS Lawsuit_Cost_Avoidance,

  MAX(CASE WHEN KPI = 'Consultants'' fees'
           AND Type = 'Actual' THEN "Value" END) AS Consultants_Fees,

  MAX(CASE WHEN KPI = 'Total number of licenses'
           AND Type = 'Actual' THEN "Value" END) AS Total_Licenses,

  MAX(CASE WHEN KPI = 'Total number of BOD&GA'
           AND Type = 'Actual' THEN "Value" END) AS Total_BOD_GA_Activities

FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE TO_DATE("month", 'Month') = (
    SELECT MAX(TO_DATE("month", 'Month'))
    FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
    WHERE "year" = YEAR(Current_date())
    and Area = 'Legal'
);
```

---

## Maintenance Breakdown (UID: `OWITvzXNz`)
- **Category**: Plant Maintenance
- **Folder**: Maintenance
- **Total Panels**: 83
- **Variables**: Type, Year

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`text`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

#### Panel: Untitled Panel (`stat`)
```sql
SELECT  
 111 as Semi_Finishing
```

---

## OD Analysis (UID: `rC7qsS9Hk`)
- **Category**: HR Analytics
- **Folder**: HR
- **Total Panels**: 16
- **Variables**: Department

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT
    COUNT(DISTINCT CASE WHEN YEAR(Last_Working_Day) = 2025 THEN EmployeeID END) AS Leavers_2025,
    COUNT(DISTINCT CASE WHEN YEAR(Entry_Date) = 2025 THEN EmployeeID END) AS Joiners_2025
FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
where Department in ($Department)
```

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
    -- Turnover Rate
    ROUND(
        COUNT(DISTINCT CASE WHEN EXTRACT(YEAR FROM "Last_Working_Day") = 2025 THEN "EmployeeID" END) * 1.0
        / NULLIF(COUNT(DISTINCT "EmployeeID"), 0) * 100, 
        1
    ) AS turnover_rate,

    -- Average Age (active employees only)
    (
        SELECT ROUND(AVG(age), 2)
        FROM (
            SELECT DISTINCT "EmployeeID", age
            FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
            WHERE "Last_Working_Day" IS NULL
            and  Department in ($Department)

        ) sub_age
    ) AS avg_age,
    
    (
        SELECT ROUND(MAX(age), 1)
        FROM (
            SELECT DISTINCT "EmployeeID", age
            FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
            WHERE "Last_Working_Day" IS NULL
            and  Department in ($Department)


        ) sub_age
    ) AS max_age,

    -- Average Seniority
    (
        SELECT ROUND(AVG(CAST("Seniority" AS FLOAT)), 2)
        FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
        where Department in ($Department)

    ) AS avg_seniority,

    (
        SELECT ROUND(MAX(CAST("Seniority" AS FLOAT)), 1)
        FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
        WHERE  Department in ($Department)

    ) AS max_seniority

FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
where Department in ($Department)
```

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
    COUNT(DISTINCT "EmployeeID") AS total_employees,

    COUNT(DISTINCT CASE WHEN "Gender" = 'Female' and Employee_Type = 'WC' THEN "EmployeeID" END) AS female_count,
    COUNT(DISTINCT CASE WHEN "Gender" = 'Female'  THEN "EmployeeID" END) AS female_count_total,

    COUNT(DISTINCT CASE WHEN "Gender" = 'Male' THEN "EmployeeID" END) AS male_count,

    ROUND(
        (COUNT(DISTINCT CASE WHEN "Gender" = 'Female' THEN "EmployeeID" END) * 100.0) 
        / NULLIF(COUNT(DISTINCT CASE WHEN Employee_Type = 'WC' THEN "EmployeeID" END), 0), 2
    ) AS female_pct,

    ROUND(
        (COUNT(DISTINCT CASE WHEN "Gender" = 'Male' THEN "EmployeeID" END) * 100.0) 
        / NULLIF(COUNT(DISTINCT "EmployeeID"), 0), 2
    ) AS male_pct,

    ROUND(
        (COUNT(DISTINCT CASE WHEN "Gender" = 'Female' THEN "EmployeeID" END) * 100.0)
        / NULLIF(COUNT(DISTINCT "EmployeeID"), 0), 2
    ) AS female_count_total_pct

FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
WHERE "Last_Working_Day" IS NULL
and Department in ($Department)
```

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
  max(CASE WHEN KPI = 'INTERNS HC' AND Type = 'Actual' THEN "Value" END) AS interns_count,
  max(CASE WHEN KPI = 'OUTSOURCE WC HC' AND Type = 'Actual' THEN "Value" END) AS outsource_count_wc,
  max(CASE WHEN KPI = 'OUTSOURCE BC HC' AND Type = 'Actual' THEN "Value" END) AS outsource_count_bc
FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"  
WHERE TO_DATE("month", 'Month') = (
  SELECT MAX(TO_DATE("month", 'Month'))
  FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
  WHERE "year" = YEAR(CURRENT_DATE())
  and Area = 'OD / Recruitment'
);
```

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT 
  max(CASE WHEN KPI = 'Employee Meals Provided' AND Type = 'Actual' then concat(round("Value"/1000.0,0),'K') end) as employee_meals_actual,
  max(CASE WHEN KPI = 'Total Trips Transportation " Annually"' AND Type = 'Actual' then concat(round("Value"/1000.0,0),'K') end) as trips_actual
FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"  
WHERE TO_DATE("month", 'Month') = (
  SELECT MAX(TO_DATE("month", 'Month'))
  FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
  where "year" = Year(Current_date())
  and Area in ('Security','Employee Relations')
)
```

#### Panel: Employees Age Distribution (`bargauge`)
```sql
SELECT
  COUNT(DISTINCT EmployeeID) AS employee_count,
  CASE
    WHEN age < 20.0 THEN 'Under 20'
    WHEN age >= 20.0 AND age <= 29.0 THEN '20-29'
    WHEN age >= 30.0 AND age <= 39.0 THEN '30-39'
    WHEN age >= 40.0 AND age <= 49.0 THEN '40-49'
    WHEN age >=  50.0 AND age <= 60.0 THEN '50-60'
    when age > 60.0 then '60+'
  END AS age_range
FROM "EG_CA_TRU_FAC_LOC01".HR."OD_Hire"
  where Last_Working_Day is  null
and Department in ($Department)

GROUP BY age_range
ORDER BY age_range;
```

---

## Security KPIs (UID: `M-GrMLRvz`)
- **Category**: HR Analytics
- **Folder**: HR
- **Total Panels**: 1

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT
  MAX(CASE WHEN KPI = 'Number of security violations (Aver per month)'
           AND Type = 'Actual' THEN "Value" END) AS Security_Violations_per_Month,

  MAX(CASE WHEN KPI LIKE 'Number Of complains received "transportation"%'
           AND Type = 'Actual' THEN "Value" END) AS Transportation_Complaints_per_Month,

  MAX(CASE WHEN KPI = 'Transportation Cost "Annualy "'
           AND Type = 'Actual' THEN "Value"/1000000 END) AS Annual_Transportation_Cost,

  MAX(CASE WHEN KPI = 'Total Trips Transportation " Annually"'
           AND Type = 'Actual' THEN "Value" END) AS Annual_Trips_Count,

  MAX(CASE WHEN KPI = 'Total number of Visitors "Foreign"'
           AND Type = 'Actual' THEN "Value" END) AS Foreign_Visitors_Count,

  MAX(CASE WHEN KPI = 'Total number of Travellers'
           AND Type = 'Actual' THEN "Value" END) AS Travellers_Total

FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE TO_DATE("month", 'Month') = (
    SELECT MAX(TO_DATE("month", 'Month'))
    FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
    WHERE "year" = Year(Current_date())
    and Area = 'Security'
);
```

---

## Training KPIs (UID: `RuQAZLgvk`)
- **Category**: HR Analytics
- **Folder**: HR
- **Total Panels**: 2

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT
  MAX(CASE WHEN KPI = ' Total Training Hours Annual'
           AND Type = 'Actual' THEN concat(round("Value"/1000,2), 'K') END) AS Total_Training_Hours_Annual,

  MAX(CASE WHEN KPI = ' Training Hours Per Month'
           AND Type = 'Actual' THEN concat(round("Value"/1000,2), 'K') END) AS Training_Hours_Per_Month,

  MAX(CASE WHEN KPI = ' Training Hours Per Day'
           AND Type = 'Actual' THEN round("Value",0) END) AS Training_Hours_Per_Day,

  MAX(CASE WHEN KPI = ' Employees Covered from Total HC'
           AND Type = 'Actual' THEN "Value" * 100 END) AS Employees_Covered_Percentage,

  MAX(CASE WHEN KPI = ' Training Attendance Rate'
           AND Type = 'Actual' THEN "Value" * 100 END) AS Training_Attendance_Rate,

  MAX(CASE WHEN KPI = ' Training Satisfaction Rate'
           AND Type = 'Actual' THEN "Value" * 100 END) AS Training_Satisfaction_Rate

FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
WHERE TO_DATE("month", 'Month') = (
    SELECT MAX(TO_DATE("month", 'Month'))
    FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
    WHERE "year" = Year(Current_date())
    and Area = 'OD / Training'
);
```

#### Panel: Untitled Panel (`marcusolsson-dynamictext-panel`)
```sql
SELECT
  max(CASE WHEN KPI = ' Candidate Satisfaction Rate' AND Type = 'Actual' THEN "Value" * 100 END) AS Candidate_Satisfaction,
  max(CASE WHEN KPI = ' Hiring Manager Satisfaction Rate'AND Type = 'Actual' THEN "Value" *100 END) AS Hiring_Manager_Satisfaction,
  max(CASE WHEN KPI = ' Quality Of Hire (% of hires who left during probation Period)' AND Type = 'Actual' THEN "Value" *100 END) AS prob_period,
    max(CASE WHEN KPI = ' Time To Hire' AND Type = 'Actual' THEN "Value"END) AS time_hire


FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
where TO_DATE("month", 'Month') = (
    SELECT MAX(TO_DATE("month", 'Month'))
    FROM "EG_CA_TRU_FAC_LOC01".HR."HR_KPI"
    WHERE "year" = Year(Current_date())
    and Area = 'OD / Recruitment'
  );
```

---

## Uniformity Dashboard (UID: `-CRfBZENk`)
- **Category**: Quality & Uniformity
- **Folder**: Quality KPIs
- **Total Panels**: 16
- **Variables**: MCH

### Key Panels & SQL Analysis

#### Panel: Untitled Panel (`stat`)
```sql
select count(Barcode) AS "CLASS  A+B"
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND GR_MISURA IN ('A', 'B')
```

#### Panel: Total Tested (`stat`)
```sql
select count(Barcode)
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND GR_MISURA IN ('A', 'B')
```

```sql
select count(Barcode)
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
```

#### Panel: Untitled Panel (`stat`)
```sql
select count(Barcode)
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULT_ALL_VIEW"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND GR_MISURA IN ('A', 'B')
```

```sql
select count(Barcode)
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULT_ALL_VIEW"
)as last
where $__timeFilter(Data_ora)
and rn = 1
```

#### Panel: Machines Prod (`stat`)
```sql
select count( distinct Barcode) AS "Hoffman"
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND MM_TM_Testing_code IN ('00')
```

```sql
select count(Barcode) as "ZF"
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULT_ALL_VIEW"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND MM_TM_Testing_code IN ('02')
```

```sql
select count( distinct Barcode) AS "D90"
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND MM_TM_Testing_code IN ('01')
```

#### Panel: Untitled Panel (`stat`)
```sql
select count(Barcode) as "Class A"
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND GR_MISURA IN ('A')
```

```sql
select count(Barcode) as "Class B"
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULTS"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND GR_MISURA IN ('B')
```

#### Panel: Untitled Panel (`stat`)
```sql
select count(Barcode)
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULT_ALL_VIEW"
)as last
where $__timeFilter(Data_ora)
and rn = 1
AND GR_MISURA IN ('A')
```

```sql
select count(Barcode)
from (
select * ,
ROW_NUMBER() OVER (PARTITION BY Barcode ORDER BY Data_ora DESC) AS rn
from "EG_CA_TRU_FIN_MUL38"."MM_RESULT_ALL_VIEW"
)as last
where $__timeFilter(Data_ora)
and rn = 1
```

---

