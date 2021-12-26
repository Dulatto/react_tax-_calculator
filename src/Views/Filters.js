import React from 'react';
import { useStore } from '../store';
import { provinces, per } from '../data';

const Filters = () => {
    const [state, setState] = useStore();

    // console.log('pose', state.position)

    let province = provinces.map((x, index) => {
        return <option key={index} value={x.val}>{x.text}</option>
    })

    let time = per.map((x, index) => {
        return <option key={index} value={x.val}>{x.text}</option>
    })

    const handleProvinceChange = (e) => {
        setState(old => ({ ...old, position: e.target.value }));
    }
    const handleTimeChange = (e) => {
        setState(old => ({ ...old, time: e.target.value }));
    }
    const handleIncome = (e) => {
        setState(old => ({ ...old, income: e.target.value }));
    }

    const calculate = () => {

        setState(old => ({ ...old, salary: state.income }));
        let calculateAnnual;
        if (state.time === '0' || state.time === 0) {
            calculateAnnual = Number(state.income);
        } else if (state.time === '1') {
            calculateAnnual = Number(state.income) * 12;
        } else if (state.time === '2') {
            calculateAnnual = Number(state.income) * 26;
        } else if (state.time === '3') {
            calculateAnnual = Number(state.income) * 52;
        } else if (state.time === '4') {
            calculateAnnual = Number(state.income) * 260;
        } else if (state.time === '5') {
            calculateAnnual = Number(state.income) * 1950;
        }
        setState(old => ({ ...old, annual: calculateAnnual }));

        let federal;
        let province;
        let cpp;
        let ei;
        let nalog;
        let plata;
        let quebec;
        let pension;
        if (calculateAnnual <= 49000) {
            if (state.position === '0' || state.position === 0) {
                federal = 9.48 * Number(state.income) / 100;
                province = 5.38 * Number(state.income) / 100;
                cpp = 5.06 * Number(state.income) / 100;
                ei = 1.58 * Number(state.income) / 100;

                nalog = Number(21.5);
                plata = 100 - Number(nalog);

            } else if (state.position === '8') {
                federal = 7.85 * Number(state.income) / 100;
                province = 10.12 * Number(state.income) / 100;
                ei = 1.18 * Number(state.income) / 100;
                quebec = 5.48 * Number(state.income) / 100;
                pension = 0.49 * Number(state.income) / 100;
                cpp = Number(0);

                nalog = Number(25.1);
                plata = 100 - Number(nalog);

            }
        }
        if (calculateAnnual > 49000 && calculateAnnual <= 98020) {
            if (state.position === '0' || state.position === 0) {
                federal = 14.88 * Number(state.income) / 100;
                province = 7.6 * Number(state.income) / 100;
                cpp = 3.23 * Number(state.income) / 100;
                ei = 0.9 * Number(state.income) / 100;

                nalog = Number(26.61);
                plata = 100 - Number(nalog);
            }
        }
        if (calculateAnnual > 98020 && calculateAnnual <= 152020) {
            if (state.position === '0' || state.position === 0) {
                federal = 18.82 * Number(state.income) / 100;
                province = 8.7 * Number(state.income) / 100;
                cpp = 2.08 * Number(state.income) / 100;
                ei = 0.58 * Number(state.income) / 100;

                nalog = Number(30.18);
                plata = 100 - Number(nalog);
            }
        }

        if (calculateAnnual > 216000) {
            if (state.position === '0' || state.position === 0) {
                federal = 24.96 * Number(state.income) / 100;
                province = 11.12 * Number(state.income) / 100;
                cpp = 1.05 * Number(state.income) / 100;
                ei = 0.29 * Number(state.income) / 100;

                nalog = Number(37.42);
                plata = 100 - Number(nalog);
            }
        }
        setState(old => ({ ...old, fedTax: federal.toFixed(0) }));
        setState(old => ({ ...old, provTax: province.toFixed(0) }));
        setState(old => ({ ...old, cppDeduction: cpp.toFixed(0) }));
        setState(old => ({ ...old, eiDeduction: ei.toFixed(0) }));
        setState(old => ({ ...old, qpp: quebec.toFixed(0) }));
        setState(old => ({ ...old, qpip: pension.toFixed(0) }));
        setState(old => ({ ...old, totalTax: nalog.toFixed(1) }));
        setState(old => ({ ...old, netPay: plata.toFixed(1) }));
    }



    return (
        <div className="row mt-4">
            <div className="col-md-3">
                <div className="mb-3">
                    <label className="form-label fw-bold">Enter your gross income</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-money-bill-wave"></i></span>
                        <input type="text" className="form-control text-end" value={state.income} onChange={handleIncome} />
                    </div>

                </div>
            </div>
            <div className="col-md-3">
                <div className="mb-3">
                    <label className="form-label fw-bold">Per</label>
                    <select className="form-select " value={state.time} onChange={handleTimeChange}>
                        {time}
                    </select>

                </div>
            </div>
            <div className="col-md-3">
                <div className="mb-3">
                    <label className="form-label fw-bold">Where do you work?</label>
                    <select className="form-select " value={state.position} onChange={handleProvinceChange}>
                        {province}
                    </select>

                </div>
            </div>
            <div className="col-md-3 pt-2">
                <div className="mt-4">
                    <button type="button" className="btn btn-danger" onClick={calculate} disabled={state.income == 0}>Calculate</button>
                </div>
            </div>
        </div>
    );
};

export default Filters;