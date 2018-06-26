import { createElement } from 'engine';
import ResourceUrl from 'example-resource-url';

jest.mock('@resource-url/c.mocked', () => {
    return { default: "value set in test"};
}, { virtual: true });

afterEach(() => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
});

describe('example-resource-url', () => {
    it('default snapshot', () => {
        const element = createElement('example-resource-url', { is: ResourceUrl });
        document.body.appendChild(element);
        expect(element).toMatchSnapshot();
    });

    it('returns default resource value as import path', () => {
        const element = createElement('example-resource-url', { is: ResourceUrl });
        document.body.appendChild(element);
        const resourceUrl = document.body.querySelector(".unmockedResource").textContent;
        expect(resourceUrl).toBe("c.unmocked");
    });

    it('returns value from mock defined in test file', () => {
        const element = createElement('example-resource-url', { is: ResourceUrl });
        document.body.appendChild(element);
        const resourceUrl = document.body.querySelector(".mockedResource").textContent;
        expect(resourceUrl).toBe("value set in test");
    });
});