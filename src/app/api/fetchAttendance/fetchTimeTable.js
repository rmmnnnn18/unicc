import * as cheerio from "cheerio";
import { client } from "@/lib/VTOPClient";
import { URLSearchParams } from "url";
import config from '@/app/config.json'

export default async function fetchTimetable(cookieHeader, dashboardHtml) {
    const $ = cheerio.load(dashboardHtml);

    const csrf = $('input[name="_csrf"]').val();
    const authorizedID = $('#authorizedID').val() || $('input[name="authorizedid"]').val();

    if (!csrf || !authorizedID) throw new Error("Cannot find _csrf or authorizedID");

    const semesterId = config.currSemID;
    const ttRes = await client.post(
        "/vtop/processViewTimeTable",
        new URLSearchParams({
            authorizedID,
            semesterSubId: semesterId,
            _csrf: csrf,
            x: Date.now().toString(),
        }).toString(),
        {
            headers: {
                Cookie: cookieHeader,
                "Content-Type": "application/x-www-form-urlencoded",
                Referer: "https://vtopcc.vit.ac.in/vtop/open/page",
            },
        }
    );

    const $$$ = cheerio.load(ttRes.data);

    // === 1. Parse Course Info Table ===
    const courseInfo = [];
    $$$('table.table').each((i, table) => {
        $$$(table)
            .find('tbody tr')
            .each((j, row) => {
                const cells = $$$(row).find('td');
                if (cells.length === 0) return;

                courseInfo.push({
                    slNo: $$$(cells[0]).text().trim(),
                    course: $$$(cells[2]).text().trim(),
                    LTPJC: $$$(cells[3]).text().trim(),
                    category: $$$(cells[4]).text().trim(),
                    classId: $$$(cells[6]).text().trim(),
                    slotVenue: $$$(cells[7]).text().trim(),
                    facultyDetails: $$$(cells[8]).text().trim(),
                });
            });
    });

    // === Save both to JSON ===
    const finalData = {
        semester: semesterId,
        courseInfo,
    };

    return finalData;
}