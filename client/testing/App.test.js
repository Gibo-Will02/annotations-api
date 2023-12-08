
import TestPage, { calculate, handleCalculate, handleClick } from '../src/views/TestPage';
import { render, screen, fireEvent } from '@testing-library/react';
import { NathanContainer } from '../src/views/TestPage';
import { nathanClick } from '../src/views/TestPage';
import App from '../src/App';
import ButtonTest from '../src/views/TestPage';


const buttontypes = ['one', 'two', 'three'];

test('ButtonTest component renders and toggles buttons correctly', () => {
  const { getByText } = render(<ButtonTest buttontypes={buttontypes} />);
  
  // sets first button active
  const activeButton1 = getByText('one');
  expect(activeButton1).toHaveStyle('opacity: 1');
  // tests second button is initially inactive
  const inactiveButton2 = getByText('two');
  expect(inactiveButton2).toHaveStyle('opacity: 0.6');

  // clicks second button
  fireEvent.click(inactiveButton2);

  // tests when the second button is clicked
  expect(activeButton1).toHaveStyle('opacity: 0.6');
  expect(inactiveButton2).toHaveStyle('opacity: 1');
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Test Page");
  expect(linkElement).toBeInTheDocument();
});


test('text is rendered', () => {
  render(<TestPage />)
  const textelement= screen.getByText(/There is no way a bee should be able to fly/);
  expect(textelement).toBeInTheDocument();

  const textelement2= screen.getByText(/Its wings are too small to get its fat little body off the ground./);
  expect(textelement2).toBeInTheDocument();

  const textelement3= screen.getByText(/The bee, of course, flies anyway/);
  expect(textelement3).toBeInTheDocument();

  const textelement4= screen.getByText(/because bees don't care what humans think is/);
  expect(textelement3).toBeInTheDocument();

  const textelement5= screen.getByText(/Impossible/);
  expect(textelement3).toBeInTheDocument();
});

describe("nicholas button functions", () =>{
  test('Test nicholas button functionality', () =>{
    render(<TestPage />);
    const nButton1 = screen.getByText('Nicholas button');
    fireEvent.click(nButton1);
    expect(nButton1.toHaveBeenCalled);

  
  });
});


describe('Test calculate button functions', () =>{
  it('Test click event', () => {
    render(<TestPage />);
    const calcButton1 = screen.getByText('Calculate');
    fireEvent.submit(calcButton1);
    expect(calcButton1.toHaveBeenCalled);
  });
});

describe('calculate function call returns correct', ()=>{
  it('calculate of 2 + 4 is six', ()=>{
    expect(calculate("2","+","4")).toBe(6);
  });

  it('calculate of 2 - 4 is six', ()=>{
    expect(calculate("2","-","4")).toBe(-2);
  });

  it('calculate of 2 + 4 is six', ()=>{
    expect(calculate("2","*","4")).toBe(8);
  });

  it('calculate of 2 + 4 is six', ()=>{
    expect(calculate("2","/","4")).toBe(0.5);
  });
});


describe('description', () => {
  let originalWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindowLocation,
    });
  });

  it('render test', () => {
    render(<NathanContainer />);
    const button = screen.getByRole('testingRole');
    expect(button).toHaveTextContent("Don't do it");

  });

  it('test that the button click is handled', () => {

    const nathanClickMock = jest.fn();
    const {getByRole} = render(<NathanContainer nathanClick = {nathanClickMock} />);
    const buttonElement = getByRole('testingRole');
    fireEvent.click(buttonElement);
    expect(nathanClickMock.toHaveBeenCalled);
    /*
    render(<NathanContainer />);
    const buttonElement = screen.getByText('Don\'t do it');
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveBeenCalled;
    */
  });

  it('test that redirection URL is correct', () => {
    const expectedUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3Dm';
    window.location.href = expectedUrl;
    expect(window.location.href).toBe(expectedUrl);
  });
});

