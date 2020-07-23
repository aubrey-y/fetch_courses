import fetch from 'isomorphic-fetch';
import {COURSE_URI} from "../config.js";

class CourseService {

    private term: string = "";

    async _getCoursesPromise(): Promise<string> {
        let response = await fetch(COURSE_URI, {
            method: "POST",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'max-age=0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'oscar.gatech.edu',
                'Origin': 'https://oscar.gatech.edu',
                'Referer': 'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_cat_term_date',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
            },
            body: this._getFormData()
        })
        return response.text();
    }

    _getFormData(): string {
        let baseForm: any = {
            sel_subj: 'dummy',
            sel_day: 'dummy',
            sel_schd: 'dummy',
            sel_insm: 'dummy',
            sel_camp: 'dummy',
            sel_levl: 'dummy',
            sel_sess: 'dummy',
            sel_instr: 'dummy',
            sel_ptrm: 'dummy',
            sel_attr: 'dummy'
        }
        let form: any = {
            term_in: this.term,
            sel_subj: '',
            sel_crse: '',
            sel_title: '',
            sel_schd: '%',
            sel_from_cred: '',
            sel_to_cred: '',
            sel_camp: '%',
            sel_ptrm: '%',
            sel_instr: '%',
            sel_attr: '%',
            begin_hh: '0',
            begin_mi: '0',
            begin_ap: 'a',
            end_hh: '0',
            end_mi: '0',
            end_ap: 'a'
        }
        return [Object.keys(baseForm)
            .flatMap(key => `${key}=${encodeURIComponent(baseForm[key])}`).join("&"), Object.keys(form)
            .flatMap(key => `${key}=${encodeURIComponent(form[key])}`).join("&")].join("&");
    }

    setTerm(term: string): void {
        this.term = term;
    }

    async getCourses() {
        let coursesRawHtml: string = await this._getCoursesPromise();

        console.log(coursesRawHtml);
    }
}

export default CourseService;
