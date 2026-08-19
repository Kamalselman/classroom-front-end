// import {Component} from "react";

// class H1 extends Component<{ children: ReactNode }> {
//     render() {
//         return null;
//     }
// }

import {ListView} from "@/components/refine-ui/views/list-view.tsx";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb.tsx";
import {useMemo, useState} from "react";
// import {Search} from "lucide-react/dist/lucide-react.prefixed";
import {Search} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectTrigger, SelectValue,SelectItem} from "@/components/ui/select.tsx";
import {DEPARTMENTS_OPTION} from "@/constants";
import {CreateButton} from "@/components/refine-ui/buttons/create.tsx";
import {DataTable} from "@/components/refine-ui/data-table/data-table.tsx";
import {useTable} from "@refinedev/react-table";
import {Subject} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
// import {Input} from "postcss";

const SubjesctsList = () => {
    const [searchQuery, setSearchQuery] = useState(" ");
    const [SelectedDepartment, setSelectedDepartment] = useState("all");
    const departmentFillters = SelectedDepartment === "all" ?[]:[
        { field:"department",operator:'eq' as const, value: SelectedDepartment}
    ];
    const  searchFillters = searchQuery ? [
        {field: 'name' , operator:"contains" as const,
        value:searchQuery}
    ]:[];
    const subjectTable=useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(()=>[
            {
                id:'code',
                accessorKey:"code",
                size: 100,
                header:() => <p className='column-title ml-2'> Code</p>,
                cell:({getValue } ) =><Badge>{getValue<string>()}</Badge>
            },
            {

                id:'name',
                accessorKey:'name',
                size:200,
                header: ()=> <p className='column-title'>Name</p>,
                cell :({getValue})=> <span className='text-foreground'>{getValue<string>()}</span>,
                filterFn: "includesString",

            },
            {
                id:'department',
                accessorKey:"department",
                size:150,
                header:()=> <p className="column-title">Department</p>,
                cell:({getValue})=> <Badge variant='secondary'>{getValue<string>()}</Badge>


            },
            {
                id:"description",
                accessorKey:"description",
                size:300,
                header:()=> <p className="column-title">Description</p>,
                cell:({getValue})=> <span className="text-foreground
              line-clamp-2">{getValue<string>()}</span>
            }
        ],[]),
       refineCoreProps:{
           resource:'subjects',
           pagination : { pageSize: 10, mode:'server',},
           filters:{
               permanent:[...departmentFillters ,...searchFillters]
           },
           sorters:{
               initial:[
                   {field:'id',order:"desc"}
               ]
           },

       }
    })

    return (
      <ListView>
              <Breadcrumb />
          <h1 className="page-title">Supjeckts</h1>
          <div className="intro-row">
              <p>Quick access to essential metrics and management tools     </p>
              <div className='actions-row'>
                  <div className="search-field">
                      <Search className="search-icon"/>
                      <Input
                          type='text'
                          placeholder="Search by name"
                          className='pl-10 w-full'
                          value={searchQuery}
                          onChange={(e)=>  setSearchQuery(e.target["value"])}
                      />

                      
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                      <Select
                          value={SelectedDepartment}
                        onValueChange={setSelectedDepartment}>
                          <SelectTrigger>
                              <SelectValue placeholder="Fillter by departmant"/>
                          </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                All Departments
                            </SelectItem>
                            {DEPARTMENTS_OPTION.map(department =>(
                                <SelectItem
                                    key={department.value}
                                    value={department.value}>
                                    {department.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <CreateButton/>
                  </div>
              </div>
          </div>

    <DataTable table={subjectTable}/>
      </ListView>
    )
}
export default SubjesctsList
