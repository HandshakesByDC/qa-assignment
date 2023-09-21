Feature: Image Service API Testing
    As an Anonymous user,
    I want to attach a picture to the Service and I want to have a permanent link to this picture.
    Otherwise, I want to be rejected and informed if the file is not a picture.

    Scenario Outline: 01 I have a permanent link when attach a picture to the Service
        Given I make 'POST' request to '/api/image' attached a picture with extension '<Extension>'
        When I execute the '/api/image' API and receive the response
        Then I expect response should have status 200
        And the response have a permanent link to this picture in the correct format
        And the response should have a json schema '{"image": "string"}'
        And the image link in the response is the valid UUID 'v4'

        Examples:
            | Extension |
            | .png      |
            | .jpeg     |
            | .jpg      |
            | .gif      |
            | .svg      |
            | .webp     |
            | .bmp      |
            | .ico      |
            | .tif      |

    Scenario: 02 I have a permanent link when attach a large-size picture to the Service
        Given I make a 'POST' request to '/api/image/' attached a large size picture
        When I execute the '/api/image' API and receive the response
        Then I expect response should have status 200
        And the response have a permanent link to this picture in the correct format
        And the response should have a json schema '{"image": "string"}'
        And the image link in the response is the valid UUID 'v4'

    Scenario Outline: 03 I can not attach a file which is not an image to the Service
        Given I make a 'POST' request to '/api/image/' attached a '<Extension>' file which is not an picture
        When I execute the '/api/image' API and receive the response
        Then I expect response should have status 400
        And the response should have a json schema '{"err": "string"}'
        And the error in response message should be "File isn' an image"

        Examples:
            | Extension |
            | .csv      |
            | .docx     |
            | .json     |
            | .pdf      |
            | .xml      |

    Scenario: 04 The Service will return error when I request without attach any picture
        Given I make a 'POST' request to '/api/image/' without attach any picture
        When I execute the '/api/image' API and receive the response
        Then I expect response should have status 400
        And the response should contains 'Error'

    Scenario: 05 The Service will return error when I upload picture to the incorrect endpoint
        Given I make a 'POST' request to '/api/image/invalid-endpoint' attached a valid picture
        When I execute the '/api/image/invalid-endpoint' API and receive the response
        Then I expect response should have status 404
        And the response should contains 'Error'

    Scenario: 06 The Service will return error when I trying to upload multiple pictures at once
        Given I make a 'POST' request to '/api/image' attached valid multiple pictures
        When I execute the '/api/image' API and receive the response
        Then I expect response should have status 400
        And the response should contains 'Error'