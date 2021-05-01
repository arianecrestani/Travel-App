import * as Service from "../src/server/service";

describe("Create lat long from json", () => {
  test("if no postalCode returns empty", () => {
    expect(Service.createLatLngFromJson({})).toStrictEqual({});
    expect(Service.createLatLngFromJson({ postalCode: [] })).toStrictEqual({});
  });
});
