import app from "../src/app.js";
import request from "supertest";


describe("GET /tasks", () => {
  test("Deberia responder con un codigo de estado 200", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("Deberia responder con un arreglo", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {
    describe("Se es dado un titulo y una descripcion", () => {
        const nuevaTarea = {
            titulo: "Test Task",
            descripcion: "Test Descripcion"
        };

        test("Deberia responder con un codigo de estado 200", async () => {
            const response = await request(app).post("/tasks").send(nuevaTarea);
            expect(response.statusCode).toBe(200);
        });
    
        test("Deberia tener un content-type: aplicacion/json en la cabecera", async () => {
            const response = await request(app).post("/tasks").send(nuevaTarea);
            expect(response.headers["content-type"]).toEqual(
              expect.stringContaining("json")
            );
        });
        
        test("Deberia responder con un task id", async () => {
            const response = await request(app).post("/tasks").send(nuevaTarea)
            expect(response.body.id).toBeDefined();
        });
    });

    describe("No son dados un titulo y una descripcion", () => {
        test("Deberia responder con un codigo de estado 400", async () => {
            const response = await request(app).post('/tasks').send({});
            expect(response.statusCode).toBe(400)
        })
    });
});