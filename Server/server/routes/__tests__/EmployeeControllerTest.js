const app=require('../../index.js');
const request=require('supertest');
const mongoose=require('mongoose');

const URL='mongodb+srv://Ishan:gNdyH7YrkraCKbpF@onlineticketing.8bzhwcf.mongodb.net/Ticketing?retryWrites=true&w=majority';

jest.setTimeout(3600);

describe("Employee Register",()=>{
    beforeAll(async()=>{
    
      mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    })
  
    afterAll(async ()=>{
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    
        describe("Adding Employeees",()=>{
      
          describe("Adding a Employee with empty Employeenumber",()=>{
            it("Should return status as 409",async()=>{
      
              const {body,statusCode}= await request(app).post('/employee/addemployee').send();
              expect(statusCode).toBe(409);
              expect(body).toEqual({"message":expect.any(String)});
            });
          });
        });
  
    describe("Get employee register route",()=>{
  
      describe("Error with get employee",()=>{
        it("Should return status as 500",async()=>{
          const _Id='E3029';
  
          await request(app).get(`/employee/${_Id}`).expect(404);
        })
      });
  
      describe("employee found",()=>{
        it("Should return status as 200 and the employee",async()=>{
  
          const _Id='635fdae22e5013e068f74bc9';
  
          await request(app).get(`/employee/${_Id}`).expect(200);
        })
      });
    });

describe("Getting employeees",()=>{

    beforeAll(async()=>{
  
        mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      })
    
      afterAll(async ()=>{
        await mongoose.connection.close();
      });

    describe("Get all the employeees",()=>{
  
      describe("Error with getting employeees",()=>{
        it("Should return status as 404",async()=>{
  
          await request(app).get('/employeees/getemployee').expect(404);
        })
      });

      describe("Getting all employeees with the correct way",()=>{
        it("Should return status as 200",async()=>{
  
            const { statusCode, body }= await request(app).get('/employee/getemployee');

            expect(statusCode).toBe(200);   
            expect(body).toEqual([
                {
                    "_id": expect.any(String),
                    "employee_id: ": expect.any(String), 
                    "employee_name": expect.any(String), 
                    "employee_designation": expect.any(String),
                    "employee_type": expect.any(String),
                    "experince": expect.any(String), 
                    "__v": 0,
                 }]);
        });
      });

    });
});
});
