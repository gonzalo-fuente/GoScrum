import { rest } from "msw";

export const handlers = [
  // Handles a GET /user request
  rest.get("https://goscrum-api.alkemy.org/auth/data", (req, res, ctx) => {
    return res(
      ctx.json({
        result: {
          continente: ["America", "Europa", "Otro"],
          registro: ["Otro", "Latam", "Brasil", "America del Norte"],
          Rol: ["Team Member", "Team Leader"],
        },
      })
    );
  }),
];
