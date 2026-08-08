import {DataProvider, GetListParams, GetListResponse,BaseRecord} from "@refinedev/core";
import {Subject} from "../types";

const mockSubjects: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description: "An introductory course covering the fundamentals of computer science, including algorithms, data structures, and programming basics.",
    createAt: "2026-01-15",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Linear Algebra",
    department: "Math",
    description: "A course on vector spaces, matrices, linear transformations, and systems of linear equations.",
    createAt: "2026-02-10",
  },
  {
    id: 3,
    code: "ENG110",
    name: "Academic Writing",
    department: "english",
    description: "A foundational course focused on developing academic writing skills, critical reading, and essay composition.",
    createAt: "2026-03-05",
  },
];

export const dataProvider: DataProvider ={
  getList: async <TData extends BaseRecord = BaseRecord>({resource}:GetListParams):Promise<GetListResponse<TData>> => {
    if (resource !== 'subjects' ) return{ data: [] as TData [], total:0};
    return {
    data: mockSubjects as unknown as TData[],
    total: mockSubjects.length,
    }
  },
  getOne: async () => {throw new Error("this function is not present in mock")},
  create: async () => {throw new Error("this function is not present in mock")},

  update: async () => {throw new Error("this function is not present in mock")},
  deleteOne: async () => {throw new Error("this function is not present in mock")},
  getApiUrl:()=>"",


  // الدفيقيه_H2_43M_S08P




}
