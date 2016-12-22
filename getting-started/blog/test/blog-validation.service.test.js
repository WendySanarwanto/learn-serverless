const expect = require('chai').expect;
const BlogValidationService = require('../services').BlogValidationService;

describe("Blog validation's tests", () => {
    const TITLE = "How to cook ramyun noodle";
    const CONTENT = "Duis posuere nulla nec quam bibendum imperdiet. Nullam vestibulum vestibulum interdum.";
    const CATEGORIES = "Culinary";

    it('should have no errors when all fields are not empty', () => {
        // Arrange
        const blog = {
            title: TITLE,
            categories: CATEGORIES,
            content: CONTENT
        };
        const validation = new BlogValidationService(blog);

        // Act
        isValid = validation.validate();

        // Assert
        expect(isValid).to.equals(true);
        expect(validation.error).to.be.null;
    });

    it('should have an error when title is empty', () => {
        // Arrange
        const blog = {
            title: "             ",
            categories: CATEGORIES,
            content: CONTENT
        };
        const validation = new BlogValidationService(blog);

        // Act
        isValid = validation.validate();

        // Assert
        expect(isValid).to.equals(false);
        expect(validation.error).to.be.not.null;
        expect(validation.error.message).to.include('"title" should not be empty.');
    });

    it('should have an error when categories is empty', () => {
        // Arrange
        const blog = {
            title: TITLE,
            categories: "  ",
            content: CONTENT
        };
        const validation = new BlogValidationService(blog);

        // Act
        isValid = validation.validate();

        // Assert
        expect(isValid).to.equals(false);
        expect(validation.error).to.be.not.null;
        expect(validation.error.message).to.include('"categories" should not be empty.');
    });

    it('should have an error when content is empty', () => {
        // Arrange
        const blog = {
            title: TITLE,
            categories: CATEGORIES,
            content: "      "
        };
        const validation = new BlogValidationService(blog);

        // Act
        isValid = validation.validate();

        // Assert
        expect(isValid).to.equals(false);
        expect(validation.error).to.be.not.null;
        expect(validation.error.message).to.include('"content" should not be empty.');
    });
    
    it('should have errors when categories & content are missing', () => {
        // Arrange
        const blog = {
            title: TITLE,
        };
        const validation = new BlogValidationService(blog);

        // Act
        isValid = validation.validate();

        // Assert
        expect(isValid).to.equals(false);
        expect(validation.error).to.be.not.null;
        expect(validation.error.message).to.include('"categories" is missing.');
    });

    it('should have errors when content is missing', () => {
        // Arrange
        const blog = {
            title: TITLE,
            categories: CATEGORIES,
        };
        const validation = new BlogValidationService(blog);

        // Act
        isValid = validation.validate();

        // Assert
        expect(isValid).to.equals(false);
        expect(validation.error).to.be.not.null;
        expect(validation.error.message).to.include('"content" is missing.');
    });    
});