import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();
let getProducts: typeof import("./productApi").getProducts;
let deleteProduct: typeof import("./productApi").deleteProduct;

describe("product API", () => {
    beforeEach(async () => {
        vi.stubEnv("VITE_PRODUCT_API_URL", "http://products.test");
        vi.stubGlobal("fetch", fetchMock);
        fetchMock.mockReset();
        vi.resetModules();
        ({ getProducts, deleteProduct } = await import("./productApi"));
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("gets products from the product service", async () => {
        const products = [{ id: 1, name: "Laptop", price: 1999, quantity: 3, images: [] }];
        fetchMock.mockResolvedValue({ json: vi.fn().mockResolvedValue(products) });

        const result = await getProducts();

        expect(fetchMock).toHaveBeenCalledWith("http://products.test/api/products");
        expect(result).toEqual(products);
    });

    it("sends a DELETE request when removing a product", async () => {
        fetchMock.mockResolvedValue({ ok: true });

        const result = await deleteProduct(12);

        expect(fetchMock).toHaveBeenCalledWith("http://products.test/api/products/12", { method: "delete" });
        expect(result).toBeUndefined();
    });

    it("returns false when deleting a product fails", async () => {
        fetchMock.mockResolvedValue({ ok: false });
        vi.spyOn(console, "error").mockImplementation(() => undefined);

        const result = await deleteProduct(12);

        expect(result).toBe(false);
    });
});