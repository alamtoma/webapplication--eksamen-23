import React from "react"
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react"

import Answer from "@/components/Answer"
import Button from "@/components/Button"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import useProgress from "@/hooks/useProgress"
import { Task } from "@/types"
import { NextResponse } from "next/server"
import { GET, PUT } from "@/app/api/restapi/route"

describe("Button Component", () => {
  it("renders a button with children", () => {
    render(<Button classNames="custom-class">Click me</Button>)
    const button = screen.getByText("Click me")
    expect(button).toHaveClass("custom-class")
    expect(button).toBeInTheDocument()
  })

  it("applies custom classNames to the button", () => {
    render(<Button classNames={["class1", "class2"]}>Custom Button</Button>)
    const button = screen.getByText("Custom Button")
    expect(button).toHaveClass("class1")
    expect(button).toHaveClass("class2")
  })
})

describe("PUT function", () => {
  it("returns an error response if count is not provided", () => {
    const mockRequest = {
      nextUrl: {
        searchParams: {
          get: jest.fn(() => null),
        },
      },
    };

    const response = PUT(mockRequest as any);

    expect(response).toEqual(
      NextResponse.json({ success: false, error: "Invalid count" })
    );
  });

  it("returns a success response with tasks if count is provided", () => {
    const mockRequest = {
      nextUrl: {
        searchParams: {
          get: jest.fn(() => "5"),
        },
      },
    };

    const response = PUT(mockRequest as any);

    expect(response).toEqual(
      NextResponse.json({ success: true, data: tasks }, { status: 207 })
    );
  });
});

describe("GET function", () => {
  it("returns an error response if count is not provided", () => {
    const mockRequest = {
      nextUrl: {
        searchParams: {
          get: jest.fn(() => null),
        },
      },
    };

    const response = GET(mockRequest as any);

    expect(response).toEqual(
      NextResponse.json({ success: false, error: "Invalid count" })
    );
  });

  it("returns a success response with tasks if count is provided", () => {
    const mockRequest = {
      nextUrl: {
        searchParams: {
          get: jest.fn(() => "5"),
        },
      },
    };

    const response = GET(mockRequest as any);

    expect(response).toEqual(
      NextResponse.json({ success: true, data: tasks.slice(0, 5) }, { status: 200 })
    );
  });
});

describe("Progress Component", () => {
  const tasks: Task[] = [
    {
      id: "123",
      text: "Skriv resultatet av regneoperasjonen",
      data: "9|2",
      type: "add",
    },
    {
      id: "234",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "add",
    },
    {
      id: "356",
      text: "Skriv resultatet av regneoperasjonen",
      data: "3|2",
      type: "multiply",
    },
  ]

  it("handles next and prev buttons", () => {
    const mockSetState = jest.fn();

    render(<Progress tasks={tasks} state={0} setState={mockSetState} />);

    const nextButton = screen.getByText(/Neste/i);
    const prevButton = screen.getByText(/Forrige/i);

    fireEvent.click(nextButton);
    expect(mockSetState).toHaveBeenCalledWith(1);

    fireEvent.click(prevButton);
    expect(mockSetState).toHaveBeenCalledWith(0);
  });
});
  it("renders the provided text", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toBeInTheDocument()
  })

  it("applies the correct CSS class", () => {
    const text = "This is a test task text."
    render(<TaskText text={text} />)
    const taskTextElement = screen.getByText(text)

    expect(taskTextElement).toHaveClass("text-sm text-slate-400")
  })

it("renders the header text correctly", () => {
  render(<Header taskNumber={1} />);
  const headerElement = screen.getByText(/Oppgave 1/i);
  expect(headerElement).toBeInTheDocument();
});

  it("updates the answer correctly", () => {
    render(<Answer />)
    const inputElement = screen.getByPlaceholderText("Sett svar her")

    fireEvent.input(inputElement, { target: { value: "11" } })

    expect(inputElement.value).toBe("11")
  })

  it('displays "Bra jobbet!" when the answer is correct', () => {
    render(<Answer />)
    const inputElement = screen.getByPlaceholderText("Sett svar her")
    const sendButton = screen.getByText("Send")

    fireEvent.input(inputElement, { target: { value: "11" } })
    fireEvent.click(sendButton)

    const successMessage = screen.getByText("Bra jobbet!")
    expect(successMessage).toBeInTheDocument()
  })
  it("renders a list of tasks correctly", () => {
    render(<Tasks>{null}</Tasks>)

    for (const task of tasks) {
      const taskElement = screen.getByText(task.text)
      const typeElement = screen.getByText(task.type)
      const dataElement = screen.getByText(task.data)

      expect(taskElement).toBeInTheDocument()
      expect(typeElement).toBeInTheDocument()
      expect(dataElement).toBeInTheDocument()
    }
  })
  it("initializes with count as 0 and returns the current task", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    expect(result.current.count).toBe(0)
    expect(result.current.current).toEqual(tasks[0])
  })

  it("updates count when next is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.next()
    })

    expect(result.current.count).toBe(1)
    expect(result.current.current).toEqual(tasks[1])
  })
  const tasks = [
    {
      id: "124",
      text: "Skriv resultatet av regneoperasjonen",
      type: "add",
      data: "9|4",
    },
  ];
  it("updates count when prev is called", () => {
    const { result } = renderHook(() => useProgress({ tasks }))

    act(() => {
      result.current.prev()
    })

    expect(result.current.count).toBe(tasks.length - 1)
    expect(result.current.current).toEqual(tasks[tasks.length - 1])
  })
  describe("Answer Component", () => {
    it("handles user input", () => {
      const mockNext = jest.fn();
      const mockCurrentTask = { id: '123', text: 'Test task', type: 'add', data: '5|3' };
  
      render(<Answer currentTask={mockCurrentTask} next={mockNext} tasks={[mockCurrentTask]} state={0} />);
  
      const inputElement = screen.getByPlaceholderText(/Sett svar her/i);
      fireEvent.input(inputElement, { target: { value: '8' } });
  
      expect(inputElement.value).toBe('8');
    });
    
    it("calculates the correct answer", () => {
      const mockNext = jest.fn();
      const mockCurrentTask = { id: '123', text: 'Test task', type: 'add', data: '5|3' };
  
      render(<Answer currentTask={mockCurrentTask} next={mockNext} tasks={[mockCurrentTask]} state={0} />);
  
      const inputElement = screen.getByPlaceholderText(/Sett svar her/i);
      const sendButton = screen.getByText(/Send/i);
  
      fireEvent.input(inputElement, { target: { value: '8' } });
      fireEvent.click(sendButton);
  
      const successMessage = screen.getByText(/Bra jobbet!/i);
      expect(successMessage).toBeInTheDocument();
    });

    it("shows correct answer on Show the answer button click", () => {
      const wrapper = shallow(<Answer currentTask={mockCurrentTask} next={mockNext} tasks={[mockCurrentTask]} state={0} />);
      wrapper.setState({ showAnswerButton: true });
      const showAnswerButton = wrapper.find('button');
      showAnswerButton.simulate('click');
      expect(wrapper.state().showAnswer).toEqual(true);
    });
    
   it("shows next task on Show next task button click", () => {
      const wrapper = shallow(<Answer currentTask={mockCurrentTask} next={mockNext} tasks={[mockCurrentTask]} state={0} />);
      wrapper.setState({ showAnswer: true });
     const showNextTaskButton = wrapper.find('button');
    showNextTaskButton.simulate('click');
    expect(mockNext).toHaveBeenCalled();
  });

  });

