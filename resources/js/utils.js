export const getAllSections = () => {
    return new axios.get('/api/sections').then(response => {
        return response;
    }).catch(error => {
        handleError(error);
    });
}

export const getSectionBySlug = (slug) => {
    return new axios.get(`/api/sections/${slug}`).then(response => {
        return response;
    }).catch(error => {
        handleError(error);
    });
}

export const getTopicsBySectionId = (sectionId) => {
    return new axios.get(`/api/sections/${sectionId}/topics`).then(response => {
        return response;
    }).catch(error => {
        handleError(error);
    });
}

export const getTopicById = (id) => {
    return new axios.get(`/api/topics/${id}`).then(response => {
        return response;
    }).catch(error => {
        handleError(error);
    });
}

export const getRepliesByTopicId = (topicId) => {
    return new axios.get(`/api/topics/${topicId}/posts`).then(response => {
        return response;
    }).catch(error => {
        handleError(error);
    });
}

export const handleError = (error) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error); // TODO - handle this a little more gracefully for error display fro dev mode
    }
    // TODO - how we want to handle error logging on prod?
}
