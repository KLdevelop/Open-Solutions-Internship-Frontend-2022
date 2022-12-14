import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToDeleteEmp, fetchEmployees, Employee } from 'Src/models/actions';
import {
  AddEmployeeModal,
  RedEmployeeModal,
  AcceptModal,
  Header,
  Table,
  TrackProcesses,
  HeadButtons,
} from './components';
import s from './style.module.scss';

export const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employees);
  const { deleteProcesses, postProcesses, editProcesses, deleteArr } = useAppSelector(
    (state) => state.empInProcess,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRedModalOpen, setIsRedModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const { orgid, divid } = useParams();
  const someDiv: Employee = { id: 0, id_division: +divid!, FIO: '', address: '', position: '' };
  const [curEmp, setCurEmp] = useState(someDiv);
  const [curId, setCurId] = useState(0);
  const onAddClick = () => {
    setIsAddModalOpen(true);
  };
  const onBackClick = () => {
    navigate(`/organizations/${orgid}`);
  };
  const onRedClick = (div: Employee) => {
    setCurEmp(div);
    setIsRedModalOpen(true);
  };
  const onDeleteClick = (id: number) => {
    setCurId(id);
    setIsAcceptModalOpen(true);
  };
  const deleteOrg = () => {
    dispath(addToDeleteEmp(curId));
  };
  useEffect(() => {
    document.title = 'Employees';
    dispath(fetchEmployees(+divid!));
  }, [dispath, divid]);
  return (
    <div className={s.orgscontainer}>
      {isAddModalOpen && (
        <AddEmployeeModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          idDivision={+divid!}
        />
      )}
      {isRedModalOpen && (
        <RedEmployeeModal isOpen={isRedModalOpen} setIsOpen={setIsRedModalOpen} emp={curEmp} />
      )}
      {isAcceptModalOpen && (
        <AcceptModal
          isOpen={isAcceptModalOpen}
          setIsOpen={setIsAcceptModalOpen}
          action={deleteOrg}
        />
      )}
      <Header past="Divisions" title="Employees" />
      <HeadButtons onAddClick={onAddClick} onBackClick={onBackClick} addItem="Employee" />
      <Table
        tablehead={['id', 'id_division', 'FIO', 'address', 'position', 'Actions']}
        tablelist={employees}
        deleteArr={deleteArr}
        onRedClick={onRedClick}
        onDeleteClick={onDeleteClick}
      />
      <TrackProcesses
        postProcesses={postProcesses}
        deleteProcesses={deleteProcesses}
        editProcesses={editProcesses}
      />
    </div>
  );
};
