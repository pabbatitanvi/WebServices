import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoShareFormComponent } from '../info-share-form/info-share-form.component';
@Component({
  selector: 'app-display-component',
  templateUrl: './display-component.component.html',
  styleUrls: ['./display-component.component.scss'],
  standalone: true,
  imports: [InfoShareFormComponent]
})
export class DisplayComponentComponent{
//  @Input() numberAdded : any; EVENTEMITTER
//  @Output() eventEmitter = new EventEmitter<any>();

 public courses: any = [
    {"name" : "SWENG 452W", "expertIn" : "Embedded Systems", "id" : 1},
    {"name" : "SWENG 421", "expertIn" : "Software Architectural Design", "id" : 2} ,
    {"name" : "SWENG 431", "expertIn" : "Software Testing", "id" : 3}, 
    {"name" : "MGMT 409", "expertIn" : "Project Management", "id" : 4}, 
    {"name" : "SWENG 411", "expertIn" : "Object Oriented Design", "id" : 5},
    {"name" : "CMPSC 431W", "expertIn" : "Database design and management", "id" : 6}]

  public descriptions :any=[
    {"descr": "Embedded Systems", "details" : "The design and implementation of real time systems. SWENG 452W Embedded Real Time Systems (3) Real time operating systems is the study of hardware/software systems in which timing constraints must be met for correctness. Real time systems are embedded in applications ranging from the antilock brakes in cars to the flight control systems for jetliners. Students are first introduced to the concept of systems with real time constraints by examining case studies. The unified modeling languages (UML) with real time extension is introduced allowing students to capture the constraints present in the systems in a variety of models allowing the problem to be described at several levels of abstraction. Tasks and messages are introduced as programming structures which can satisfy the constraints described by the UML models.  Increasingly complex case studies will give the class the opportunity to explore more sophisticated inter-task communications mechanisms as well as common pitfalls present in RTOS applications. Students will learn how to verify the correctness of their applications in order to guarantee that the real time constraints can be met when the system is deployed. Discussion will turn to application programmer interfaces used by hardware vendors to port hardware into a RTOS. The class will end by designing and building a complex RTOS by a team of students using the techniques learned in the class. ", "id":1},
    {"descr": "Software Architectural Design", "details": "This course introduces the frequently-used software infrastructures in software development by experienced engineers. The formal UML notations are utilized to design software architecture and help communicate the design visually. Students will learn the real practice of architectural styles, design patterns and design reuse. As to certain complex problems, alternative architectures will be proposed and their design trade offs will be evaluated. For instance, students compare two-tier with three-tier client/server architectures for distributed systems, and employ multi-process and multi-thread concurrent architectures for high performance computation systems. Moreover, students learn to conduct high level quality analysis from the design artifacts. The quality evaluation will focus on a number of attributes, including reusability, extendibility and performance. A great deal of effort is placed on the major categories of design types containing dozens of separate design patterns. Students first review the most fundamental design patterns. Afterwards, they apply creational patterns to effectively create objects, partitioning patterns to categorize objects, structural patterns to allocate objects, behavioral patterns to interface the communication between objects, and concurrent patterns to handle tasks simultaneously. These skills will enable students to extend their own knowledge after graduation by giving them the skills to learn new patters on their own. Finally, students will integrate their programs with native code applications to enlarge the application domains. To achieve best reusability, they also learn modular designs to develop component-based software. These help them meet today's software needs of cross applications and architectures.", "id":2},
    {"descr": "Software Testing", "details":"The levels of testing explored are 1) unit level (each module is tested independently), 2) integration testing (where the modules are integrated together and tested as a complete system), and 3) acceptance testing (the testing requirements of the users). Following this, specific test methodologies are addressed. By the end of this course the student should also be able to develop an appropriate test plan.", "id":3},
    {"descr": "Project Management", "details":"Project management for non-business majors covers the technical and people skills related to project management within a variety of organizational structures. Students learn the tools and concepts needed to successfully balance schedule, budget, and scope while managing risk and resources during the project life cycle. Leadership and teamwork skills are emphasized and practiced in a hands-on approach throughout the duration of the course.", "id":4},
    {"descr": "Software Design", "details":"Topics include software process modeling, requirements elicitation and documentation, software architecture design and analysis, detailed design and programming, graphical user interface (GUI's) design and prototyping, software quality assessment, software testing, software maintenance and evolution management, personal and team-based development. In lab students gain practical experience by completing programming assignments and utilizing computer-aided software engineering (CASE) tools for their personal projects tailored to each stage of the software life cycle. A semester long team-based project is required that reinforces teamwork fundamentals and the concepts covered in lecture. The projects and assignments provide an opportunity for student teamwork, document writing, and oral presentations.", "id":5},
    {"descr": "Database Management Systems", "details":"Topics include: conceptual data modeling, relational data model, relational query languages, schema normalization, database/Internet applications, and database system issues.", "id":6}]
 //Function to emit the image number to be selected
 
 


} 