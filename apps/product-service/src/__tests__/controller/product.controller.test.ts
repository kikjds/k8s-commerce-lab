import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../service/product.service.js", () => ({
    fetchActiveProducts: vi.fn(),
    getProductById: vi.fn(),
    createNewProduct: vi.fn(),
    deleteProductBasedOnId: vi.fn(),
}));

import * as productService from "../../service/product.service.js";
import {
    createProduct,
    getProducts,
    getSpecificProduct,
} from "../../controller/product.controller.js";

function createResponse() {
    const response = {
        status: vi.fn(),
        json: vi.fn(),
        sendStatus: vi.fn(),
    };

    response.status.mockReturnValue(response);
    return response;
}

describe("product controller", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns active products", async () => {
        const products = [{ id: 1, name: "Laptop", price: 1999 }];
        const response = createResponse();
        vi.mocked(productService.fetchActiveProducts).mockResolvedValue(products as never);

        await getProducts({} as never, response as never);

        expect(productService.fetchActiveProducts).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(products);
    });

    it("rejects a product request without an id", async () => {
        const response = createResponse();

        await getSpecificProduct({ params: {} } as never, response as never);

        expect(productService.getProductById).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: "Id not provided" });
    });

    it("rejects product creation without an image", async () => {
        const response = createResponse();
        const request = {
            body: { name: "Laptop", price: "1999", quantity: "3" },
        };

        await createProduct(request as never, response as never);

        expect(productService.createNewProduct).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: "Image not provided" });
    });

});