import app from "../src/app.js";
import request from "supertest";


describe("GET /tasks", () => {
  test("Debería responder con un código de estado 200", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("Debería responder con un arreglo de tareas", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {
    describe("Se es dado un título y una descripción a la tarea", () => {
        const nuevaTarea = {
            titulo: "Test Task",
            descripcion: "Test Descripcion"
        };

        test("Debería responder con un código de estado 200", async () => {
            const response = await request(app).post("/tasks").send(nuevaTarea);
            expect(response.statusCode).toBe(200);
        });
    
        test("Debería tener un content-type: aplicacion/json en la cabecera", async () => {
            const response = await request(app).post("/tasks").send(nuevaTarea);
            expect(response.headers["content-type"]).toEqual(
              expect.stringContaining("json")
            );
        });
        
        test("Debería responder con un task id", async () => {
            const response = await request(app).post("/tasks").send(nuevaTarea)
            expect(response.body.id).toBeDefined();
        });
    });

    describe("No son dados un título y una descripcion a la tarea", () => {
        test("Debería responder con un código de estado 400", async () => {
            const response = await request(app).post('/tasks').send({});
            expect(response.statusCode).toBe(400)
        })
    });
});