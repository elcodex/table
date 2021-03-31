import { act, render, screen, cleanup } from "@testing-library/react";
import Table from "../components/Table/Table";
import TableHeader from "../components/TableHeader/TableHeader";
import TableRows from "../components/TableRows/TableRows";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import FilterTextInput from "../components/FilterTextInput/FilterTextInput";

afterEach(cleanup);

describe('components classes', () => {
    test('Table', async () => {
        await act(async () => {
            render(<Table 
                data={[{name: 'name'}]}
                fieldsNames={['name']}
                maxPageRows={4}
                className='testTable'
            />);
        });

        expect(document.getElementsByClassName('testTable')).toHaveLength(1);
    });

    test('Header', async () => {
        await act(async () => {
            render(<TableHeader 
                fieldsNames={['name']}
                setSort={jest.fn()}
                classPrefix={'testTable'}
            />);
        });

        expect(document.getElementsByClassName('testTable__header')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__header__columnButton')).toHaveLength(1);
    });

    test('Rows', async () => {
        await act(async () => {
            render(<TableRows
                fieldsNames={['name']}
                pageData={[{name: 'Common name'}]}
                classPrefix={'testTable'}
            />);
        });

        expect(document.getElementsByClassName('testTable__rows')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__rows__row')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__row__column')).toHaveLength(1);
    });

    test('NavigationBar', async () => {
        await act(async () => {
            render(<NavigationBar
                lastPage={10}
                currentPage={1}
                setPage={jest.fn()}
                classPrefix={'testTable'}
            />);
        });

        expect(document.getElementsByClassName('testTable__navigation')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__navigation__numberButton_current')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__navigation__numberButton')).toHaveLength(4); //1 2 3 ... 10
        expect(document.getElementsByClassName('testTable__navigation__direction')).toHaveLength(2);
        
        expect(document.getElementsByClassName('testTable__navigation__pageInput__input')).toHaveLength(0);
        expect(document.getElementsByClassName('testTable__navigation__pageInput__button')).toHaveLength(1);
    });

    test('NavigationBar, input is focused', async () => {
        await act(async () => {
            render(<NavigationBar
                lastPage={10}
                currentPage={1}
                setPage={jest.fn()}
                classPrefix={'testTable'}
            />);
        });

        act(() => {screen.getByText("...").click() });

        expect(document.getElementsByClassName('testTable__navigation')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__navigation__numberButton_current')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__navigation__numberButton')).toHaveLength(4); //1 2 3 ... 10
        expect(document.getElementsByClassName('testTable__navigation__direction')).toHaveLength(2);
        
        expect(document.getElementsByClassName('testTable__navigation__pageInput__input')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__navigation__pageInput__button')).toHaveLength(0);
    });

    test('Filter', async () => {
        await act(async () => {
            render(<FilterTextInput
                text='Filter'
                setFilter={jest.fn()}
                classPrefix={'testTable'}
            />);
        });

        expect(document.getElementsByClassName('testTable__filter')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__filter__label')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__filter__input')).toHaveLength(1);
        expect(document.getElementsByClassName('testTable__filter__hint')).toHaveLength(1);
    });

    test('Displayed Text: length', async () => {
        await act(async () => {
            render(<Table
                data={[{name: 'name'}]}
                fieldsNames={['name']}
                maxPageRows={4}
                className='testTable'
                textForDataLength='Records:'
            />);
        });

        expect(document.getElementsByClassName('testTable__lengthText')).toHaveLength(1);
    });

    test('Displayed Text: range', async () => {
        await act(async () => {
            render(<Table
                data={[{name: 'name'}]}
                fieldsNames={['name']}
                maxPageRows={4}
                className='testTable'
                textForFromToDataRows='Rows:'
            />);
        });

        expect(document.getElementsByClassName('testTable__rangeText')).toHaveLength(1);
    });

    test('Displayed Text: range', async () => {
        await act(async () => {
            render(<Table
                data={[{name: 'name'}]}
                fieldsNames={['name']}
                maxPageRows={4}
                className='testTable'
                textForPageNumber='Page:'
            />);
        });

        expect(document.getElementsByClassName('testTable__pageNumberText')).toHaveLength(1);
    });
});