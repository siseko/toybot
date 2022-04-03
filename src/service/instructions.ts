import { Direction, Action } from "../types";

export const fetchInstructions = (): Promise<Action[]> =>
  fetch(`/commands.txt`)
    .then((response) => response.text())
    .then((file) =>
      file
        .split(/\r?\n/)
        .filter((action) => action.trim())
        .map((action) => {
          const [type, args] = action
            .trim()
            .split(/\s/)
            .filter((a) => !!a);

          let payload = null;
          if (args) {
            const [x, y, direction] = args.split(",");
            payload = {
              x: Number(x),
              y: Number(y),
              direction: direction as Direction,
            };
          }
          return { type: type as Action["type"], payload };
        })
    );
