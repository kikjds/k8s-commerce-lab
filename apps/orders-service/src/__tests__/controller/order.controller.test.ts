import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../service/order.service.js", () => ({
    fetchOrders: vi.fn(),
    createOrder: vi.fn(),
}));

import * as orderService from "../../service/order.service.js";
import { createOrder, getOrder } from "../../controller/order.controller.js";

function createResponse() {
    const response = {
        status: vi.fn(),
        json: vi.fn(),
    };

    response.status.mockReturnValue(response);
    return response;
}

describe("order controller", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns orders", async () => {
        const orders = [{ id: 1, productId: 2, price: 50, quantity: 1 }];
        const response = createResponse();
        vi.mocked(orderService.fetchOrders).mockResolvedValue(orders as never);

        await getOrder({} as never, response as never);

        expect(orderService.fetchOrders).toHaveBeenCalledOnce();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(orders);
    });

    it("rejects an order without required data", async () => {
        const response = createResponse();

        await createOrder({ body: { productId: "1", price: "20" } } as never, response as never);

        expect(orderService.createOrder).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ message: "Not enough data" });
    });

    it("creates an order from valid data", async () => {
        const order = { id: 1, productId: 2, price: 50, quantity: 3 };
        const response = createResponse();
        vi.mocked(orderService.createOrder).mockResolvedValue(order as never);

        await createOrder({ body: { productId: "2", price: "50", quantity: "3" } } as never, response as never);

        expect(orderService.createOrder).toHaveBeenCalledWith(2, 50, 3);
        expect(response.status).toHaveBeenCalledWith(202);
        expect(response.json).toHaveBeenCalledWith(order);
    });
});