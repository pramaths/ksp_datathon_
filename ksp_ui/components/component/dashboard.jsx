import React from 'react';
import {Button} from '@/components/ui/button'; 
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';


export default function Dashboard() {
  return (
    <div className="container bg-white py-6 p-2 text-black">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Police Department</h1>
          <p className="text-gray-500">View information about the Police Department.</p>
        </div>
        <div className="space-y-4">
          <div className="grid w-full grid-cols-3 items-stretch gap-4 bg-white">
            {['PI', 'DySP', 'SP'].map((rank) => (
              <div key={rank} className="relative group bg-white">
              <Button
  className={`w-full h-full overflow-hidden rounded-lg shadow-none group-hover:translate-y-0 transition-transform ${
    rank === 'PI' ? 'cursor-wait' : ''
  }`}
  variant="outline"
>
  <span>{rank}</span>
</Button>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            <PoliceOfficersSection />
            <AssignNewTasksForm />
          </div>
        </div>
      </div>
    </div>
  );
}


function PoliceOfficersSection() {
  return (
    <div className="border rounded-lg p-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Police Officers</h2>
        <div className="grid w-full grid-cols-2 items-center gap-4">
          <OfficerDetails
            name="John Doe"
            detail="Investigating case #123"
          />
          <OfficerDetails
            name="Alice Smith"
            detail="Patrolling"
          />
          {/* Repeat for other officers */}
        </div>
      </div>
    </div>
  );
}

function OfficerDetails({ name, detail }) {
  return (
    <div className="grid gap-1">
      <div>
        <span className="font-semibold">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">- {detail}</span>
      </div>
    </div>
  );
}

function AssignNewTasksForm() {
  return (
    <div className="border rounded-lg p-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Assign New Tasks</h2>
        <form className="grid gap-4">
          {/* Repeat the task assignment fields as necessary */}
          <TaskAssignmentField officerId="officer1" />
          <TaskAssignmentField officerId="officer2" />
          <TaskAssignmentField officerId="officer3" />
          <button className='bg-green-400' type="submit">Assign Tasks</button>
        </form>
      </div>
    </div>
  );
}

function TaskAssignmentField({ officerId }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm" htmlFor={officerId}>
        {`Officer ${officerId.slice(-1)}`}
      </Label>
      <Input className="w-full max-w-md" id={officerId} placeholder="Enter task" />
    </div>
  );
}
