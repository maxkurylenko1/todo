import { reviveTodoDates } from "../reviveTodoDates";
import type { Todo } from "../../types/todo";

const iso = (d: string) => new Date(d).toISOString();

const base = (p: Partial<Todo> = {}): Todo => ({
  id: "id",
  text: "t",
  completed: false,
  createdAt: new Date("2025-01-01T10:00:00.000Z"),
  settings: { isTitleActive: true, isDueDateActive: true, isPriorityActive: true },
  ...p,
});

describe("reviveTodoDates", () => {
  it("returns null for non-array input", () => {
    expect(reviveTodoDates(null as any)).toBeNull();
    expect(reviveTodoDates({} as any)).toBeNull();
    expect(reviveTodoDates("[]")).toBeNull();
  });

  it("revives createdAt and dueDate ISO strings into Date instances", () => {
    const raw = [
      {
        ...base(),
        createdAt: iso("2025-01-02T09:00:00.000Z"),
        dueDate: iso("2025-01-03T09:00:00.000Z"),
      },
      {
        ...base({ id: "2" }),
        createdAt: iso("2024-12-31T23:59:59.000Z"),
        dueDate: undefined,
      },
    ];

    const revived = reviveTodoDates(raw)!;
    expect(Array.isArray(revived)).toBe(true);

    expect(revived[0].createdAt).toBeInstanceOf(Date);
    expect(revived[0].dueDate).toBeInstanceOf(Date);
    expect(revived[0].createdAt.getTime()).toBe(new Date("2025-01-02T09:00:00.000Z").getTime());
    expect(revived[0].dueDate!.getTime()).toBe(new Date("2025-01-03T09:00:00.000Z").getTime());

    expect(revived[1].createdAt).toBeInstanceOf(Date);
    expect(revived[1].createdAt.getTime()).toBe(new Date("2024-12-31T23:59:59.000Z").getTime());
    expect(revived[1].dueDate).toBeUndefined();
  });

  it("does not mutate the input objects", () => {
    const raw = [
      {
        ...base(),
        createdAt: iso("2025-01-02T09:00:00.000Z"),
        dueDate: iso("2025-01-03T09:00:00.000Z"),
      },
    ];
    const snapshot = JSON.parse(JSON.stringify(raw));
    const revived = reviveTodoDates(raw)!;

    // Input remains ISO strings
    expect(raw).toEqual(snapshot);

    // Output has Dates
    expect(revived[0].createdAt).toBeInstanceOf(Date);
    expect(revived[0].dueDate).toBeInstanceOf(Date);
  });

  it("passes through Date instances unchanged", () => {
    const raw = [
      {
        ...base(),
        createdAt: new Date("2025-02-01T00:00:00.000Z"),
        dueDate: new Date("2025-02-02T00:00:00.000Z"),
      },
    ];
    const revived = reviveTodoDates(raw)!;
    expect(revived[0].createdAt).toBeInstanceOf(Date);
    expect(revived[0].dueDate).toBeInstanceOf(Date);
    expect(revived[0].createdAt.getTime()).toBe(new Date("2025-02-01T00:00:00.000Z").getTime());
    expect(revived[0].dueDate!.getTime()).toBe(new Date("2025-02-02T00:00:00.000Z").getTime());
  });

  it("ignores non-date fields and extra properties", () => {
    const raw = [
      {
        ...base({ title: "x", priority: "high" }),
        createdAt: iso("2025-01-02T09:00:00.000Z"),
        dueDate: iso("2025-01-03T09:00:00.000Z"),
        someExtra: "keep-me",
      } as any,
    ];
    const revived = reviveTodoDates(raw)!;
    expect((revived[0] as any).someExtra).toBe("keep-me");
    expect(revived[0].priority).toBe("high");
    expect(revived[0].createdAt).toBeInstanceOf(Date);
    expect(revived[0].dueDate).toBeInstanceOf(Date);
  });

  it("handles items missing createdAt/dueDate gracefully", () => {
    const raw = [{ ...base(), createdAt: undefined, dueDate: undefined } as any];
    const revived = reviveTodoDates(raw)!;

    // Depending on your implementation choice:
    // - If you set a fallback date, assert instanceOf(Date)
    // - If you leave as undefined, assert undefined
    // Adjust the following lines to match your final behavior.

    // Example: if you leave them undefined:
    expect(revived[0].createdAt).toBeInstanceOf(Date);
    expect(revived[0].dueDate).toBeUndefined();
  });
});
